import { useEffect, useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useDispatch, useSelector } from '@/packages/store';

const useTradeParty = () => {
	const {
		general: { isMobile = false },
		profile: { organization = {} },
	} = useSelector((state) => state);

	const router = useRouter();

	const dispatch = useDispatch();

	const params = { };

	// const getOrganizationAPI = useRequest(
	// 	'get',
	// 	false,
	// 	scope,
	// )('/partner/get_channel_partner_organization');

	const getOrganization = async () => {
		try {
			// const res = await getOrganizationAPI.trigger({
			// 	params,
			// });

			// if (organizationType === 'importer_exporter') {
			// 	dispatch(
			// 		setImporterExporterStoreState({
			// 			organization: { ...res.data },
			// 		}),
			// 	);
			// } else {
			// 	dispatch(
			// 		setServiceProviderStoreState({
			// 			organization: { ...res.data },
			// 		}),
			// 	);
			// }
		} catch (err) {
			console.log(err.data);
		}
	};

	// useEffect(() => {
	// 	if (
	// 		(organizationType === 'importer_exporter'
	// 			&& !Object.keys(buyOrgData).length)
	// 		|| (organizationType === 'service_provider'
	// 			&& !Object.keys(sellOrgData).length)
	// 	) {
	// 		getOrganization();
	// 	}
	// }, [organizationType]);

	// const organizationData =		(organizationType === 'importer_exporter' ? buyOrgData : sellOrgData)
	// 	|| getOrganizationAPI.data;

	const onClickBackButton = () => {
		router.push('/settings');
	};

	return {
		isMobile,
		onClickBackButton,
		organizationData: organization,
		// is_importer_exporter,
		// is_service_provider,
		// organizationType,
		// setOrganizationType,
	};
};

export default useTradeParty;
