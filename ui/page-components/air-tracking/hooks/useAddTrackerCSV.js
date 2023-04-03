import { Toast } from '@cogoport/components';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useAddTrackerCSV = () => {
	const { general } = useSelector((s) => s);
	const { push } = useRouter();
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_saas_air_tracker_via_csv',
			method : 'post',
		},

		{ manual: true },
	);
	const addTrackerCSV = async (values, fileValue) => {
		const data = {
			airline_id             : values,
			file_url               : fileValue,
			organization_branch_id : general?.query?.branch_id,
		};

		try {
			const res = await trigger({ data });

			const { hasError } = res || {};
			if (hasError) throw new Error();

			const { airline_id, message } = res.data;

			if (message) {
				Toast.warning(message);
			}

			const airValue = 'air';

			push(
				`/saas/air-tracking/${airline_id}?
				isFirstVisit=true&shippingLineId=${airline_id}&trackingType=${airValue}`,
			);
		} catch (err) {
			Toast.error("Couldn't add tracker");
		}
	};
	return {
		addTrackerCSV,
		loading,
	};
};

export default useAddTrackerCSV;
