import { useRequest } from '@/packages/request';

const useCreateShipment = ({ closeHandler = () => {}, refetchTrackerList }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : 'create_saas_shipment_details',
	}, { manual: true });

	const updateTrackerInfo = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
			refetchTrackerList();
			closeHandler();
		} catch (err) {
			console.error(err);
		}
	};

	return {
		updateTrackerInfo,
		loading,
	};
};

export default useCreateShipment;
