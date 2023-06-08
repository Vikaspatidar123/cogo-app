import { Toast } from '@cogoport/components';
import { useContext } from 'react';

import { ShipmentDetailContext } from '../common/Context';

import useGetExistingCompanies from './useGetExistingCompanies';

import { useRequest } from '@/packages/request';

const useUpdateShipment = ({
	role,
	servProvId,
	listServiceRefetch = () => {},
	service_prov_ids,
	setUtilities = () => {},
	utilities,
	listShipmentTradePartners = () => {},
	compType,
	existing_company_controls,
	source = '',
	task = {},
}) => {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);
	const {
		newFields,
		handleSubmit,
		onError, errors, formProps, companyDetails,
		control,
	} = useGetExistingCompanies(
		{
			role,
			servProvId,
			compType,
			existing_company_controls,
		},
	);

	const service_ids = [];
	(service_prov_ids || []).forEach((item) => {
		if (servProvId === item?.service_provider?.id) {
			service_ids.push(item?.id);
		}
		return false;
	});

	// const addressValue = null;
	const pincodeValue = null;

	// if (address) {
	// 	const addressParts = address.split('::');
	// 	addressValue = addressParts[0] || null;
	// 	pincodeValue = addressParts[1] || null;
	// }
	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_trade_partner',
		method : 'post',
	}, { manual: true });

	const handleExistingCompany = async () => {
		// if (!address) {
		// 	Toast.error('Please fill all the fields');
		// 	return;
		// }
		try {
			const {
				check_pan_number,
				mobile_number,
				alternate_mobile_number,
				...formProp
			} = formProps;
			const params = {
				service_provider_id:
					role === 'collection_party' ? servProvId : undefined,
				service_ids      : service_ids || undefined,
				shipment_id      : shipment_data?.id,
				trade_party_type : role === 'booking_party' ? 'self' : role,
				trade_party_id:
					compType === 'booking_party'
						? companyDetails?.trade_party_id
						: formProp?.business_name,
				address                       : formProp?.address,
				pincode                       : formProp?.pincode,
				name                          : formProp?.name,
				email                         : formProp?.email,
				mobile_country_code           : mobile_number?.country_code,
				mobile_number                 : mobile_number?.number,
				alternate_mobile_country_code : alternate_mobile_number?.country_code,
				alternate_mobile_number       : alternate_mobile_number?.number,
				pending_task_id               : source === 'task' ? task?.id : undefined,
			};

			const res = await trigger({ params });

			if (!res.hasError) {
				Toast.success('Company added successfully');
				setUtilities({
					...utilities,
					addCompanyModal: false,
				});

				Toast.success('Task Completed!!');

				listServiceRefetch();
				listShipmentTradePartners();
			}
		} catch (err) {
			Toast.error('Fill all the fields');
		}
	};

	return {
		handleExistingCompany,
		// existingCompany,
		// setExistingCompany,
		// address,
		// setAddress,
		shipment_data,
		loading,
		pincodeValue,
		handleSubmit,
		newFields,
		onError,
		errors,
		control,
		formProps,
		companyDetails,
	};
};

export default useUpdateShipment;
