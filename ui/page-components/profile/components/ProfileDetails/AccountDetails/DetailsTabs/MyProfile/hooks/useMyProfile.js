/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useEffect, useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector, useDispatch } from '@/packages/store';
import { setProfileStoreState } from '@/packages/store/store/profile';

const useMyProfile = () => {
	const { profile } = useSelector((state) => state);

	const dispatch = useDispatch();

	const router = useRouter();

	const [showMobileVerificationModal, setShowMobileVerificationModal] = useState(null);

	const [showPasswordModal, setShowPasswordModal] = useState(false);

	const [showEditProfileDetails, setShowEditProfileDetails] = useState(false);
	const [{ loading: organizationLoading }, orgTrigger] = useRequest(
		{
			url    : '/list_organization_users',
			method : 'get',
		},
		{ manual: true },
	);

	const getOrganization = async () => {
		try {
			const resp = await orgTrigger({
				params: {
					filters: {
						user_id         : profile.id,
						organization_id : profile?.organization?.id,
					},
				},
			});
			const { data } = resp || {};

			if (data) {
				dispatch(
					setProfileStoreState({
						...profile,
						work_scopes: (data || {}).list[0].work_scopes || [],
					}),
				);
			}
		} catch (err) {
			Toast.error(err?.message);
		}
	};
	const verifyEmailId = async () => {};

	const onClickBackButton = () => {
		router.push('/settings');
	};

	useEffect(() => {
		getOrganization();
	}, []);

	// const userDetails = profile || getChannelPartnerUserAPI.data?.list?.[0];
	return {
		userDetails: profile || {},
		showEditProfileDetails,
		setShowEditProfileDetails,
		verifyEmailId,
		showMobileVerificationModal,
		setShowMobileVerificationModal,
		showPasswordModal,
		setShowPasswordModal,
		onClickBackButton,
		organizationLoading,
	};
};

export default useMyProfile;
