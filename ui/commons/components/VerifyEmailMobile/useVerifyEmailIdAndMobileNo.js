import { Toast } from '@cogoport/components';
import { useState } from 'react';

import showErrorsInToast from '../../utils/showErrorsInToast';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useVerifyEmailIdAndMobileNo = () => {
	const {
		profile: { id: userId = '' },
	} = useSelector((state) => state);

	const [showMobileNoVerificationModal, setShowMobileNoVerificationModal] =		useState(false);

	const apiName = 'resend_user_verification_email';

	const [{ loading }, resendEmailVerificationMailApi] = useRequest({
		url    : `/${apiName}`,
		method : 'post',
	}, { manual: true });

	const verifyEmailId = async () => {
		try {
			const payload = { id: userId, platform: 'app' };

			const response = await resendEmailVerificationMailApi({
				data: payload,
			});

			if (response?.hasError) return;

			Toast.success('Verification Email sent successfully');
		} catch (error) {
			showErrorsInToast(error?.error);
		}
	};
	const onClickVerifyEmailIdButton = () => {
		verifyEmailId();
	};
	const onClickVerifyMobileNoButton = () => {
		setShowMobileNoVerificationModal(true);
	};

	return {
		showMobileNoVerificationModal,
		setShowMobileNoVerificationModal,
		resendEmailVerificationMailApi,
		onClickVerifyEmailIdButton,
		onClickVerifyMobileNoButton,
		loading,
	};
};

export default useVerifyEmailIdAndMobileNo;
