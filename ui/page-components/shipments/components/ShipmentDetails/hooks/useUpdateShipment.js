import { Toast } from '@cogoport/components';
import { useState, useContext } from 'react';

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
}) => {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);
	const {
		existingCompanyOptions, existingAddresses, newFields,
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
	const [existingCompany, setExistingCompany] = useState('');
	const [address, setAddress] = useState('');

	const service_ids = [];
	(service_prov_ids || []).forEach((item) => {
		if (servProvId === item?.service_provider?.id) {
			service_ids.push(item?.id);
		}
		return false;
	});

	let addressValue = null;
	let pincodeValue = null;

	if (address) {
		const addressParts = address.split('::');
		addressValue = addressParts[0] || null;
		pincodeValue = addressParts[1] || null;
	}
	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_trade_partner',
		method : 'post',
	}, { manual: true });

	const handleExistingCompany = async () => {
		if (!address) {
			Toast.error('Please fill all the fields');
			return;
		}
		try {
			const params = {
				service_provider_id:
					role === 'collection_party' ? servProvId : undefined,
				service_ids      : service_ids || undefined,
				shipment_id      : shipment_data?.id,
				trade_party_type : role === 'booking_party' ? 'self' : role,
				trade_party_id   : existingCompany,
				address          : addressValue,
				pincode          : pincodeValue,
			};

			const res = await trigger({ params });

			if (!res.hasError) {
				Toast.success('Company added successfully');
				setUtilities({
					...utilities,
					addCompanyModal: false,
				});
				listServiceRefetch();
				listShipmentTradePartners();
			}
		} catch (err) {
			Toast.error('Fill all the fields');
		}
	};

	return {
		handleExistingCompany,
		existingCompany,
		setExistingCompany,
		existingCompanyOptions,
		existingAddresses,
		address,
		setAddress,
		shipment_data,
		loading,
		pincodeValue,
		handleSubmit,
		newFields,
		onError,
		errors,
		control,
	};
};

export default useUpdateShipment;
