/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useState, useContext, useEffect } from 'react';

import { ShipmentDetailContext } from '../common/Context';

import { useForm } from '@/packages/forms';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useCreateAddCompany = ({
	roleCheck = '',
	controls = [],
	setUtilities = () => {},
	utilities = {},
	listShipmentTradePartners = () => {},
	service_prov_ids = [],
	shipmentServiceProviderId = '',
	trade_party_id = '',
}) => {
	const [errors, setErrors] = useState({});
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

	const { control, handleSubmit, watch, setValue } = useForm();

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

	useEffect(() => {
		if (firstFormProps?.not_reg_under_gst) {
			setValue('tax_number_document_url', '');
			setValue('tax_number', '');
		}
	}, [firstFormProps?.not_reg_under_gst]);

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
				const organization_params = {
					business_name : firstFormProps?.company_name,
					country_id    : firstFormProps?.country,
					organization_id:
						roleCheck !== 'collection_party'
							? shipment_data?.importer_exporter_id
							: finalServProvId,
					trade_party_type    : roleCheck === 'booking_party' ? 'self' : roleCheck,
					registration_number : firstFormProps?.registration_number,
				};

				params = {
					shipment_id          : shipment_data?.id,
					org_trade_party_data : organization_params,
					service_ids:
						roleCheck === 'collection_party' ? service_ids : undefined,
					service_provider_id:
						roleCheck === 'collection_party' ? finalServProvId : undefined,
					is_tax_applicable : firstFormProps?.not_reg_under_gst === true,
					address           : firstFormProps?.address || undefined,
					pincode           : firstFormProps?.pincode || undefined,
					tax_number:
						firstFormProps?.not_reg_under_gst === true
							? undefined
							: firstFormProps?.tax_number,
					tax_number_document_url:
						firstFormProps?.not_reg_under_gst === true
							? undefined
							: firstFormProps?.tax_number_document_url,
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
	};
};

export default useCreateAddCompany;
