import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useCreateSpotSearch = ({ extraParams }) => {
	const router = useRouter();

	const [{ loading }, createSpotCreateSearchApi] = useRequest(
		{
			url    : '/create_spot_search',
			method : 'post',
		},
		{ manual: true },
	);

	const { importer_exporter_id, importer_exporter_branch_id, user_id } = extraParams;

	const createSpotSearch = async (payload, onPush) => {
		try {
			const newPayload = {
				search_type                     : 'ltl_freight',
				source                          : 'platform',
				importer_exporter_id,
				importer_exporter_branch_id,
				user_id,
				ltl_freight_services_attributes : payload,

			};

			const res = await createSpotCreateSearchApi({ data: newPayload });

			const { data = {} } = res || {};

			const APP = {
				href : '/book/[search_id]',
				as   : `/book/${(data || {}).id}`,
			};

			const { href, as } = APP;
			router.push(href, as);

			if (onPush) {
				onPush();
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.data));
		}
	};

	return {
		loading,
		createSpotSearch,
	};
};

export default useCreateSpotSearch;
