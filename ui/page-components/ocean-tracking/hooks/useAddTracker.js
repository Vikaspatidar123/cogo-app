import { Toast } from '@cogoport/components';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useAddTracker = () => {
	const { general } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest({
		url    : 'create_saas_container_subscription',
		method : 'post',
	}, { manual: true });
	const { push } = useRouter();

	const addTracker = async (values) => {
		if (!values?.search_type) {
			Toast.error('Please Select Search type');
			return;
		}
		const data = {
			...values,
			organization_branch_id: general?.query?.branch_id,
		};

		try {
			const res = await trigger({ data });

			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { id, message } = res.data;
			if (message) {
				Toast.warning(message);
			}
			const container = 'container';
			push(
				'/saas/tracking/[tracker_id]',
				`/saas/tracking/${id}?isFirstVisit=true&shippingLineId=${values.shipping_line_id}&trackingType=${container}`,
			);
		} catch (err) {
			Toast.error("Couldn't add tracker");
		}
	};

	return {
		addTracker,
		loading,
	};
};

export default useAddTracker;
