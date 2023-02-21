import { Toast } from '@cogoport/components';
import { useEffect, useState } from 'react';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector, useDispatch } from '@/packages/store';
import { setProfileStoreState } from '@/packages/store/store/profile';

const useMyProfile = () => {
	const {
		profile,
		general: { isMobile = false },
	} = useSelector((state) => state);

	const translationKey =		'profile:accountDetails.tabOptions.profile.verifyEmail.toastMessage.';

	const dispatch = useDispatch();

	const router = useRouter();

	const [showMobileVerificationModal, setShowMobileVerificationModal] =		useState(null);

	const [showPasswordModal, setShowPasswordModal] = useState(false);

	const [showEditProfileDetails, setShowEditProfileDetails] = useState(false);

	// const getChannelPartnerUserAPI = useRequest(
	// 	'get',
	// 	false,
	// 	'partner',
	// )('/partner/get_channel_partner_users');

	// const resendEmailVerificationMailAPI = useRequest(
	// 	'post',
	// 	false,
	// 	'partner',
	// )('/resend_channel_partner_user_verification_email');

	const verifyEmailId = async () => {
		// try {
		// 	await resendEmailVerificationMailAPI?.trigger();

		// 	Toast.success(
		// 		`${(`${translationKey}1`)} "${profile.email}" ${
		// 			`${translationKey}2`
		// 		}`,
		// 	);
		// } catch (error) {
		// 	Toast.error(error.data);
		// }
	};

	const getChannelPartnerUser = async () => {
		// try {
		// 	const res = await getChannelPartnerUserAPI.trigger({
		// 		params: {
		// 			account_types : ['importer_exporter'],
		// 			filters       : {
		// 				user_id: profile.userId,
		// 			},
		// 		},
		// 	});

		// 	dispatch(
		// 		setProfileStoreState({
		// 			...res,
		// 		}),
		// 	);
		// } catch (err) {
		// 	console.log(err);
		// }
	};

	const onClickBackButton = () => {
		router.push('/profile');
	};

	useEffect(() => {
		if (!Object.keys(profile).length) {
			getChannelPartnerUser();
		}
	}, []);

	// const userDetails = profile || getChannelPartnerUserAPI.data?.list?.[0];

	return {
		isMobile,
		// loading     : getChannelPartnerUserAPI.loading,
		userDetails: profile,
		showEditProfileDetails,
		setShowEditProfileDetails,
		verifyEmailId,
		showMobileVerificationModal,
		setShowMobileVerificationModal,
		showPasswordModal,
		setShowPasswordModal,
		getChannelPartnerUser,
		onClickBackButton,
	};
};

export default useMyProfile;
