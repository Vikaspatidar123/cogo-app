import { Toast } from '@cogoport/components';
import { useRouter } from 'next/router';

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
		// if (!values?.search_type) {
		// 	Toast.error('Please Select Search type');
		// 	return;
		// }
		const data = {
			shipping_line_id       : values.shipping_line_id?.value,
			search_type            : values?.search_type,
			search_value           : values?.search_value,
			organization_branch_id : general?.query?.branch_id,
		};

		try {
			// setLoading(true);
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
				`/saas/tracking/${id}?isFirstVisit=true&shippingLineId=${values.shipping_line_id.value}&trackingType=${container}`,
			);
		} catch (err) {
			Toast.error("Couldn't add tracker");
			// setLoading(false);
		}
	};

	return {
		addTracker,
	};
};

export default useAddTracker;
