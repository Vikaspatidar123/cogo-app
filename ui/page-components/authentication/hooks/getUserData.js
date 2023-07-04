import { isEmpty } from '@cogoport/utils';

import getUserSession from './getUserSession';

import { setProfileStoreState as storeProfile } from '@/packages/store/store/profile';

const getUserData = async ({
	store, isServer, req,
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
					organizations: organization ? [organization] : organizations,
					permissions_navigations,
					branch: organization?.branches?.[0],
				};

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
			// console.log(e);
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
