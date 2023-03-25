import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import getGeoConstants from '@/ui/commons/constants/geo';
import getApiErrorString from '@/ui/commons/utils/getApiErrorString';

const geo = getGeoConstants();

const cogoVerseTeamIDS = [
	geo.uuid.cogoverse_admin_id,
	geo.uuid.cogoverse_executive_id,
	geo.uuid.cogoverse_kam_id,
];

const useCreateSpotSearch = ({ extraParams, onPush }) => {
	const {
		scope = '',
		query = {},
		userRoleIDs = [],
	} = useSelector(({ general, profile }) => ({
		scope       : general?.scope,
		query       : general?.query,
		userRoleIDs : profile?.partner?.user_role_ids,
	}));

	const router = useRouter();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_spot_search',
		method : 'post',
	}, { manual: true });

	const { importer_exporter_id, importer_exporter_branch_id, user_id } = extraParams;

	const createSpotSearch = async (
		ftl_freight_service_touch_points_attributes,
		payload,
	) => {
		if (isEmpty(ftl_freight_service_touch_points_attributes)) return;

		if (scope === 'partner' && !extraParams.importer_exporter_id) {
			Toast.error('Please select importer exporter');
			return;
		}
		if (scope === 'partner' && !extraParams.importer_exporter_branch_id) {
			Toast.error('Please select organization branch');
			return;
		}
		if (scope === 'partner' && !extraParams.user_id) {
			Toast.error('Please select organization user');
			return;
		}

		try {
			const ftl_freight_services_attributes = payload.map(
				(ftl_service_attributes) => ({
					...ftl_service_attributes,
					ftl_freight_service_touch_points_attributes,
				}),
			);

			const isCogoVerseMember = userRoleIDs.some((elem) => cogoVerseTeamIDS.includes(elem));

			const newPayload = {
				search_type : 'ftl_freight',
				source      : 'platform',
				importer_exporter_id,
				importer_exporter_branch_id,
				user_id,
				ftl_freight_services_attributes,
				tags:
          scope === 'partner'
          && (query?.source === 'communication' || isCogoVerseMember)
          	? ['cogoverse']
          	: undefined,
			};

			const res = await trigger({ data: newPayload });

			const { data = {} } = res || {};

			let partneras = `/book/${data?.id}/${extraParams?.importer_exporter_id}`;
			let partnerHref = '/book/[search_id]/[importer_exporter_id]';

			if (query?.source) {
				partneras += `?source=${query?.source}`;
				partnerHref += `?source=${query?.source}`;
			}

			const ROUTE_MAPPING = {
				app: {
					href : '/book/[search_id]',
					as   : `/book/${(data || {}).id}`,
				},
				partner: {
					href : partnerHref,
					as   : partneras,
				},
			};
			const { href, as } = ROUTE_MAPPING[scope];
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
