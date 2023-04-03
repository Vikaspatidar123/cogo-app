import { useRequest } from '@cogo/commons/hooks';
import getGeoConstants from '@cogo/globalization/constants/geo';
import { useRouter } from '@cogo/next';
import { useSelector } from '@cogo/store';

import getServicesAttributes from '../utils/getServicesAttributes';

const geo = getGeoConstants();

const cogoVerseTeamIDS = [
	geo.uuid.cogoverse_admin_id,
	geo.uuid.cogoverse_executive_id,
	geo.uuid.cogoverse_kam_id,
];

const useCreateSpotSearch = ({
	importerExporterDetails,
	searchType = '',
	onSuccess: onSuccessCallback,
	onFailure: onFailureCallback,
	redirectOnSuccess = true,
}) => {
	const router = useRouter();

	const {
		scope = '',
		query = {},
		userRoleIDs = [],
	} = useSelector(({ general, profile }) => ({
		scope       : general?.scope,
		query       : general?.query,
		userRoleIDs : profile?.partner?.user_role_ids,
	}));

	const createSpotSearchApi = useRequest(
		'post',
		false,
		scope,
	)('/create_spot_search');

	const getPayload = ({ formValues }) => {
		const {
			id: importer_exporter_id,
			branchId: importer_exporter_branch_id,
			userId: importer_exporter_user_id,
		} = importerExporterDetails || {};

		const servicesAttributes =			getServicesAttributes({ searchType, formValues }) || {};

		return {
			source      : 'platform',
			importer_exporter_id,
			importer_exporter_branch_id,
			user_id     : importer_exporter_user_id,
			search_type : searchType,
			...servicesAttributes,
		};
	};

	const onSuccess = ({ data }) => {
		if (!redirectOnSuccess) {
			return;
		}

		const { id: search_id } = data || {};

		const { id: importer_exporter_id } = importerExporterDetails || {};

		let href = '/book/[search_id]/[importer_exporter_id]';
		let as = `/book/${search_id}/${importer_exporter_id}`;

		if (query?.source) {
			as += `?source=${query?.source}`;
			href += `?source=${query?.source}`;
		}

		router.push(href, as);
	};

	const createSpotSearch = async ({ formValues }) => {
		try {
			let payload = getPayload({ formValues });

			const isCogoVerseMember = userRoleIDs.some((elem) => cogoVerseTeamIDS.includes(elem));

			const checkIsCogoVerse =				scope === 'partner'
				&& (query?.source === 'communication' || isCogoVerseMember);

			if (checkIsCogoVerse) {
				payload = { ...payload, tags: ['cogoverse'] };
			}

			const response = await createSpotSearchApi.trigger({ data: payload });

			const responseData = response.data || {};

			onSuccess({ data: responseData });

			onSuccessCallback?.({ data: responseData });
		} catch (error) {
			onFailureCallback?.({ errors: error });
		}
	};

	return {
		loading: createSpotSearchApi.loading,
		createSpotSearch,
	};
};

export default useCreateSpotSearch;
