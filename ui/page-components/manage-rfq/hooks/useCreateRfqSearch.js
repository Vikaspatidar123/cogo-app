import { Toast } from '@cogoport/components';

import getApiErrorString from '../helpers/getApiErrorString';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateRfqSearch = () => {
	const { push } = useRouter();

	const {
		profile: { id = '' },
	} = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_rfq_search',
	}, { manual: true });

	const createRfqSearch = async (item) => {
		const RFQ_ID = item?.rfq_id || item?.id;

		try {
			const res = await trigger({
				data: {
					rfq_id            : RFQ_ID,
					user_id           : id,
					performed_by_id   : id,
					performed_by_type : 'user',
				},
			});
			const itm = res.data.rfq_data;
			push(
				`/manage-rfq/[rfq_id]?serial_id=${itm?.serial_id}&created_at=
                ${itm?.created_at}&port=${itm?.total_port_pairs}`,
				`/manage-rfq/${itm?.id}?${
					itm?.serial_id ? `serial_id=${itm?.serial_id}&` : ''
				}${itm?.created_at ? `created_at=${itm?.created_at}&` : ''}${
					itm?.total_port_pairs ? `port=${itm?.total_port_pairs}` : ''
				}`,
			);
		} catch (err) {
			Toast.error(getApiErrorString(err?.data));
		}
	};

	return { searchLoading: loading || false, createRfqSearch };
};

export default useCreateRfqSearch;
