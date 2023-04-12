import { Toast } from '@cogoport/components';
import { useContext } from 'react';

import { useRequest } from '@/packages/request';
import { ShipmentDetailContext } from '@/ui/page-components/shipments/components/ShipmentDetails/common/Context';

const useRequestCancellation = ({ setShowCancel, refetch = () => {} }) => {
	const [{ shipment_data }] = useContext(ShipmentDetailContext);
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment',
		method : 'post',
	}, { manual: true });

	const onRequest = async () => {
		try {
			const res = await trigger({
				data: {
					is_cancellation_requested : true,
					id                        : shipment_data?.id,
				},
			});

			if (!res.hasError) {
				Toast.success('Cancellation Requested');
				setShowCancel(false);
				refetch();
			} else {
				Toast.error('Something went wrong, on requesting Cancellation');
			}
		} catch (err) {
			Toast.error(err?.data || 'Something went wrong, we are working on it!');
		}
	};

	return {
		loading,
		onRequest,
	};
};

export default useRequestCancellation;
