import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useContext } from 'react';

import { export_process_options, import_process_options, poc_options } from '../../../utils/addPocOptions';
import { ShipmentDetailContext } from '../common/Context';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const useCreatePoc = ({
	controls,
	setUtilities = () => {},
	utilities = {},
	listShipmentTradePartners = () => {},
}) => {
	const [errors, setErrors] = useState({});
	const [{ shipment_data }] = useContext(ShipmentDetailContext);

	const designation_options = (poc_options || []).map((item) => ({
		label : item?.label,
		value : item?.value,
	}));

	const process_options =		utilities?.trade_type === 'export'
		? export_process_options
		: import_process_options;

	const controlPoc =		utilities?.roleCheck === 'external_poc'
		? controls(process_options, designation_options)
		: controls(designation_options);

	const { control, handleSubmit, watch } = useForm(controlPoc);

	const formProps = watch();

	let trigger = '';
	let loading = '';
	const [{ loading:apiloading1 }, trigger1] = useRequest({
		url    : 'create_organization_poc',
		method : 'post',
	}, { manual: true });
	const [{ loading:apiloading2 }, trigger2] = useRequest({
		url    : 'create_organization_trade_party_poc',
		method : 'post',
	}, { manual: true });

	if (
		['external_poc'].includes(utilities.roleCheck)
		|| isEmpty(utilities.roleCheck)
	) {
		trigger = trigger1;
		loading = apiloading1;
	} else {
		trigger = trigger2;
		loading = apiloading2;
	}

	const onError = (err) => {
		setErrors(err);
	};

	const org_id = ['booking_party', 'external_poc'].includes(utilities.roleCheck)
		|| !isEmpty(utilities.roleCheck)
		? shipment_data?.importer_exporter_id
		: utilities.servProvId;

	const handleAddPoc = async (poc = '', pocList = []) => {
		try {
			let params = {
				trade_party_type : utilities.roleCheck,
				trade_party_id   : utilities.trade_party_id || undefined,
				organization_id  : org_id || undefined,
				trade_type       : utilities.trade_type,
				shipment_id      : shipment_data?.id,
			};
			if (pocList.length) {
				const pocData = pocList?.find((item) => item?.id === poc) || {};
				params = {
					...params,
					name                : pocData.name,
					email               : pocData.email,
					mobile_number       : pocData.mobile_number,
					mobile_country_code : pocData.mobile_country_code,
					work_scopes         : pocData.work_scopes,
				};
			} else {
				params = {
					...params,
					trade_party_type        : utilities.roleCheck,
					trade_party_id          : utilities.trade_party_id || undefined,
					name                    : formProps?.name,
					email                   : formProps?.email,
					mobile_number           : formProps?.mobile_number?.number,
					mobile_country_code     : formProps?.mobile_number?.country_code,
					alternate_mobile_number : formProps?.alternate_mobile_number?.number,
					alternate_mobile_country_code:
						formProps?.alternate_mobile_number?.country_code,
					work_scopes     : formProps?.work_scopes,
					processes       : formProps?.processes,
					organization_id : org_id || undefined,
					trade_type      : utilities.trade_type,
					shipment_id     : shipment_data?.id,
				};
			}
			const res = await trigger({ params });

			if (!res.hasError) {
				Toast.success('POC created successfully');
				setUtilities({
					...utilities,
					addPocModal        : false,
					addExternlPocModal : false,
					trade_type         : '',
				});
				listShipmentTradePartners();
			}
		} catch (error) {
			let errorObj = {};
			if (error?.data?.mobile_number) {
				const message = error?.data?.mobile_number;
				errorObj = {
					...errorObj,
					mobile_number: {
						type: 'custom',
						message,
					},
				};
			}

			if (Object.keys(errorObj)?.length > 0) {
				setErrors((previousErrors) => ({
					...previousErrors,
					...errorObj,
				}));
			} else showErrorsInToast(error?.error);
		}
	};

	return {
		designation_options,
		control,
		controlPoc,
		handleAddPoc,
		handleSubmit,
		onError,
		errors,
		loading,
	};
};

export default useCreatePoc;
