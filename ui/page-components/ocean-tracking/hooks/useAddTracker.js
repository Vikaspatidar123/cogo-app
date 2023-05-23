import { Toast } from '@cogoport/components';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useAddTracker = ({ fileValue, labeledValue }) => {
	const { general } = useSelector((s) => s);
	const api = labeledValue ? 'create_saas_container_tracker_via_csv' : 'create_saas_container_subscription';
	const [{ loading }, trigger] = useRequest({
		url    : api,
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
			file_url               : fileValue || undefined,
			organization_branch_id : general?.query?.branch_id,
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
			// eslint-disable-next-line no-restricted-globals
			if (labeledValue) { location.reload(); } else {
				push(
					`/saas/ocean-tracking/${id}?isFirstVisit=true&`
				+ `shippingLineId=${values.shipping_line_id}&trackingType=${container}`,
				);
			}
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
