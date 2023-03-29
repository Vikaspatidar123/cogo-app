import { Toast } from '@cogoport/components';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useAddTracker = () => {
	const { general } = useSelector((s) => s);
	const [{ loading }, trigger] = useRequest(
		{
			url    : 'create_saas_air_subscription',
			method : 'post',
		},

		{ manual: true },
	);

	const { push } = useRouter();

	const addTracker = async (values) => {
		const data = {
			airline_id             : values?.options,
			airway_bill_no         : values?.airwayBillNo,
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

			push(

				`/saas/tracking/${id}?isFirstVisit=true&shippingLineId=${values.option}&trackingType=air`,
			);
		} catch (err) {
			Toast.error("Couldn't add tracker");
		}
	};

	return {
		addTracker,
	};
};

export default useAddTracker;
