import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useUpDatePin = (pinned, refetch) => {
	const { query } = useSelector(({ general }) => ({
		query: general?.query,
	}));

	const profile = useSelector((state) => state?.profile);

	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment',
		method : 'post',
	}, { manual: true });

	const message = !pinned ? 'Pinned' : 'Unpinned';

	const onPinShipment = async () => {
		try {
			const res = await trigger({
				data: {
					id           : query?.id,
					pinned_by_id : !pinned ? profile?.id : '',
				},
			});

			if (res) {
				Toast.success(`${message} Successfully!`);
				refetch();
			}
		} catch (err) {
			Toast.error(err?.data);
		}
	};

	return {
		onPinShipment,
		loading,
	};
};

export default useUpDatePin;
