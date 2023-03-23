import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import toast from '@cogoport/front/components/toast';
import getApiErrorString from '@cogoport/front/utils/functions/getApiErrorString';
import { useRouter } from '@cogo/next';
import getGeoConstants from '@cogo/globalization/constants/geo';

const geo = getGeoConstants();

const cogoVerseTeamIDS = [
	geo.uuid.cogoverse_admin_id,
	geo.uuid.cogoverse_executive_id,
	geo.uuid.cogoverse_kam_id,
];

const useCreateSpotSearch = ({ extraParams }) => {
	const router = useRouter();

	const {
		scope = '',
		query = {},
		userRoleIDs = [],
	} = useSelector(({ general, profile }) => ({
		scope: general?.scope,
		query: general?.query,
		userRoleIDs: profile?.partner?.user_role_ids,
	}));

	const createSpotCreateSearchApi = useRequest(
		'post',
		false,
		scope,
	)('/create_spot_search');

	const { importer_exporter_id, importer_exporter_branch_id, user_id } =
		extraParams;

	const createSpotSearch = async (payload, onPush) => {
		if (scope === 'partner' && !extraParams.importer_exporter_id) {
			toast.error('Please select importer exporter');
			return;
		}
		if (scope === 'partner' && !extraParams.importer_exporter_branch_id) {
			toast.error('Please select organization branch');
			return;
		}
		if (scope === 'partner' && !extraParams.user_id) {
			toast.error('Please select organization user');
			return;
		}

		const isCogoVerseMember = userRoleIDs.some((elem) =>
			cogoVerseTeamIDS.includes(elem),
		);

		try {
			const newPayload = {
				search_type: 'ltl_freight',
				source: 'platform',
				importer_exporter_id,
				importer_exporter_branch_id,
				user_id,
				ltl_freight_services_attributes: payload,
				tags:
					scope === 'partner' &&
					(query?.source === 'communication' || isCogoVerseMember)
						? ['cogoverse']
						: undefined,
			};

			const res = await createSpotCreateSearchApi.trigger({ data: newPayload });

			const { data = {} } = res || {};

			let partneras = `/book/${data?.id}/${extraParams?.importer_exporter_id}`;
			let partnerHref = `/book/[search_id]/[importer_exporter_id]`;

			if (query?.source) {
				partneras += `?source=${query?.source}`;
				partnerHref += `?source=${query?.source}`;
			}

			const ROUTE_MAPPING = {
				app: {
					href: '/book/[search_id]',
					as: `/book/${(data || {}).id}`,
				},
				partner: {
					href: partnerHref,
					as: partneras,
				},
			};

			const { href, as } = ROUTE_MAPPING[scope];
			router.push(href, as);

			if (onPush) {
				onPush();
			}
		} catch (err) {
			toast.error(getApiErrorString(err?.data));
		}
	};

	return {
		loading: createSpotCreateSearchApi.loading,
		createSpotSearch,
	};
};

export default useCreateSpotSearch;
