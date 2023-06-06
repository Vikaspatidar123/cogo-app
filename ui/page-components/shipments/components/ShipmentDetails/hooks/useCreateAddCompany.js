/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-param-reassign */
import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useContext, useEffect } from 'react';

import { setFormatedTradeParties } from '../../../utils/formatTradeParty';
import { mutateShipConsFields } from '../../../utils/mutateFields';
import { ShipmentDetailContext } from '../common/Context';

import { useDebounceQuery, useForm } from '@/packages/forms';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const emptyValue = {
	country_id              : '',
	business_name           : '',
	registration_number     : '',
	address                 : '',
	pincode                 : '',
	name                    : '',
	work_scopes             : '',
	email                   : '',
	mobile_number           : '',
	alternate_mobile_number : '',
	not_reg_under_gst       : '',
	tax_number              : '',
	tax_number_document_url : '',
};
const FTL_FREIGHT = 'ftl_freight';
const SHIPPER = 'shipper';
const useCreateAddCompany = ({
	roleCheck = '',
	controls = [],
	tradeParties = [],
	setUtilities = () => {},
	setTradeParties = () => {},
	utilities = {},
	listShipmentTradePartners = () => {},
	service_prov_ids = [],
	shipmentServiceProviderId = '',
	trade_party_id = '',
	source = '',
	task = {},
}) => {
	const [errors, setErrors] = useState({});
	const { query, debounceQuery } = useDebounceQuery();

	const [compType, setCompType] = useState(
		['shipper', 'booking_party'].includes(roleCheck)
			? 'booking_party'
			: 'trade_partner',
	);
	const finalServProvId = shipmentServiceProviderId || trade_party_id;
	const [{ shipment_data }] = useContext(ShipmentDetailContext);

	const service_ids = [];
	(service_prov_ids || []).forEach((item) => {
		if (finalServProvId === item?.service_provider?.id) {
			service_ids.push(item?.id);
		}
	});

	const { control, handleSubmit, watch, setValue, reset } = useForm();

	const firstFormProps = watch();

	controls.forEach((field, index) => {
		if (
			field.name === 'tax_number_document_url'
			&& firstFormProps.not_reg_under_gst
		) {
			controls[index] = {
				...field,
				disabled : true,
				rules    : { required: false },
			};
			controls.forEach((item, idx) => {
				if (item.name === 'tax_number') {
					controls[idx] = {
						...item,
						disabled : true,
						rules    : { required: false },
					};
				}
			});
		}
		if (
			field.name === 'not_reg_under_gst'
			&& firstFormProps?.not_reg_under_gst
		) {
			// setValue('tax_number_document_url', '');
			// setValue('tax_number', '');
		}
	});
	const { newFields } = mutateShipConsFields({
		fields: controls,
		firstFormProps,
		setValue,
		tradeParties,
		setTradeParties,
	});
	const [{ loading:load }, listOrganizationTradeParties] = useRequest({
		url    : '/list_organization_trade_parties',
		method : 'get',
	}, { manual: true });
	const listTradeParties = async () => {
		try {
			const res = await listOrganizationTradeParties({
				params: {
					filters                         : { registration_number: firstFormProps.registration_number },
					billing_addresses_data_required : true,
					other_addresses_data_required   : true,
					poc_data_required               : true,
				},
			});
			if (!res.hasError) {
				const list = res?.data?.list || [];
				setFormatedTradeParties({ list, setTradeParties, compType });
			}
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	};
	useEffect(() => {
		if (firstFormProps?.not_reg_under_gst) {
			setValue('tax_number_document_url', '');
			setValue('tax_number', '');
		}
	}, [firstFormProps?.not_reg_under_gst]);

	useEffect(() => {
		debounceQuery(firstFormProps?.registration_number);

		if (!firstFormProps?.registration_number?.length) {
			reset({ ...emptyValue, country_id: firstFormProps?.country_id });
		}
	}, [firstFormProps?.registration_number]);

	useEffect(() => {
		if (query) {
			reset({
				...emptyValue,
				country_id          : firstFormProps?.country_id,
				registration_number : query,
			});

			listTradeParties();
		}
	}, [query]);

	const onError = (error) => {
		setErrors(error);
	};

	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_trade_partner',
		method : 'post',
	}, { manual: true });

	const handleAddCompany = async (dependentTradePartner = []) => {
		try {
			let params = {};
			if (dependentTradePartner.length) {
				params = {
					shipment_id                : shipment_data?.id,
					trade_party_type           : 'notifying_party',
					dependent_trade_party_type : [...dependentTradePartner],
				};
			} else {
				const {
					check_pan_number,
					registration_number,
					name,
					email,
					mobile_number,
					alternate_mobile_number,
					tax_number,
					tax_number_document_url,
					work_scopes,
					...formProps
				} = firstFormProps;
				params = {
					shipment_id: shipment_data?.id,
					service_ids:
						roleCheck === 'collection_party' ? service_ids : undefined,
					service_provider_id:
						roleCheck === 'collection_party' ? finalServProvId : undefined,
					organization_id:
						roleCheck !== 'collection_party'
							? shipment_data?.importer_exporter_id
							: finalServProvId,
					trade_party_type    : roleCheck === 'booking_party' ? 'self' : roleCheck,
					...formProps,
					registration_number : isEmpty(registration_number)
						? undefined
						: registration_number,
					name                    : isEmpty(name) ? undefined : name,
					email                   : isEmpty(email) ? undefined : email,
					tax_number              : isEmpty(tax_number) ? undefined : tax_number,
					tax_number_document_url : isEmpty(tax_number_document_url)
						? undefined
						: tax_number_document_url,
					work_scopes                   : work_scopes.length ? [...work_scopes] : undefined,
					mobile_country_code           : mobile_number?.country_code,
					mobile_number                 : mobile_number?.number,
					alternate_mobile_country_code : alternate_mobile_number?.country_code,
					alternate_mobile_number       : alternate_mobile_number?.number,
					is_tax_applicable:
						!isEmpty(tax_number)
						&& shipment_data?.shipment_type === FTL_FREIGHT
						&& roleCheck === SHIPPER
							? true
							: undefined,
					pending_task_id: source === 'task' ? task?.id : undefined,
				};
			}
			const res = await trigger({ params });

			if (!res.hasError) {
				if (dependentTradePartner.length) {
					Toast.success('Notify Party updated successfully');
				} else {
					Toast.success('Organization created successfully');
				}
				setUtilities({
					...utilities,
					addCompanyModal: false,
				});
				listShipmentTradePartners();
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.data));
		}
	};

	return {
		newFields,
		control,
		handleSubmit,
		watch,
		errors,
		onError,
		handleAddCompany,
		setCompType,
		compType,
		firstFormProps,
		loading,
		load,
	};
};

export default useCreateAddCompany;
