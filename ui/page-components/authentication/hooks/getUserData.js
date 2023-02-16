import { isEmpty } from '@cogoport/utils';

import routeConfig from '../../_app/routes/index';

import getUserSession from './getUserSession';

import projectNavigationMappings from '@/packages/navigation-configs/config/navigation-mapping';
import getAuthParam from '@/packages/request/helpers/get-auth-params';
import { setProfileStoreState as storeProfile } from '@/packages/store/store/profile';

const getUserData = async ({
	store, isServer, req, pathname,
}) => {
	let user_data = null;
	const setData = async () => {
		try {
			const data = await getUserSession({ req });
			if (!data.hasError && !isEmpty(data) && !isEmpty(data.data)) {
				const {
					user,
					organizations = [],
					organization,
					permissions_navigations,
				} = data.data;

				user_data = {
					...user,
					organization: organization
						? { ...organization, preferred_languages: user.preferred_languages }
						: undefined,
					organizations : organization ? [organization] : organizations,
					permissions_navigations,
					branch        : organization?.branches?.[0],
				};
				const authorizationparameters = getAuthParam(
					permissions_navigations,
					routeConfig,
					pathname,
					projectNavigationMappings,
				);
				if (authorizationparameters) {
					user_data.authorizationparameters = authorizationparameters;
				}
				if (user_data.id) {
					await store.dispatch(storeProfile(user_data));
				}
				await store.dispatch(
					storeProfile({
						language: (user?.preferred_languages || [])[0],
					}),
				);
			}
		} catch (e) {
			console.log(e, 'eeee');
		}
	};

	if (isServer) {
		await setData();
	} else {
		user_data = store.getState().profile;
	}

	return user_data;
};

export default getUserData;
