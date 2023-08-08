import { Toast } from '@cogoport/components';
import { useContext } from 'react';

import { ShipmentDetailContext } from '../common/Context';

import { useRequest } from '@/packages/request';

const useCreateShipper = ({
	role,
	bookingPartyData = {},
	listServiceRefetch = () => {},
	setUtilities = () => {},
	utilities = {},
	listShipmentTradePartners = () => {},
}) => {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);

	const addressValue = bookingPartyData.address?.[0]?.address;
	const pincodeValue = bookingPartyData.address?.[0]?.pincode;
	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_trade_partner',
		method : 'post',
	}, { manual: true });

	const handleAddShipper = async () => {
		try {
			const params = {
				shipment_id      : shipment_data?.id,
				trade_party_type : role,
				trade_party_id   : bookingPartyData.trade_party_id,
				address          : addressValue,
				pincode          : pincodeValue,
			};
			const res = await trigger({ params });

			if (!res.hasError) {
				Toast.success('Successfully');
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
		handleAddShipper,
		loading,
	};
};

export default useCreateShipper;
