import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import getApiErrorString from '@/ui/commons/utils/getApiErrorString';

const useCreateSpotSearch = ({ extraParams, onPush }) => {
	const router = useRouter();

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_spot_search',
			method : 'post',
		},
		{ manual: true },
	);

	const { importer_exporter_id, importer_exporter_branch_id, user_id } = extraParams;

	const createSpotSearch = async (
		ftl_freight_service_touch_points_attributes,
		payload,
	) => {
		if (isEmpty(ftl_freight_service_touch_points_attributes)) return;

		try {
			const ftl_freight_services_attributes = payload.map(
				(ftl_service_attributes) => ({
					...ftl_service_attributes,
					ftl_freight_service_touch_points_attributes,
				}),
			);

			const newPayload = {
				search_type : 'ftl_freight',
				source      : 'platform',
				importer_exporter_id,
				importer_exporter_branch_id,
				user_id,
				ftl_freight_services_attributes,
			};

			const res = await trigger({ data: newPayload });

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
			Toast.error(getApiErrorString(err.data));
		}
	};

	return {
		createSpotSearch,
		loading,
	};
};

export default useCreateSpotSearch;
