import { useState } from 'react';

import { useRequest } from '@/packages/request';
import { APP_EVENT, trackEvent } from '@/ui/commons/constants/analytics';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const useMobileNoForm = () => {
	const [showOtpForm, setShowOtpForm] = useState(false);
	const [userDetails, setUserDetails] = useState({
		userId    : '',
		contactNo : {
			number       : '',
			country_code : '',
		},
	});
	const [{ loading }, trigger] = useRequest({
		url    : '/send_login_otp',
		method : 'post',
	}, { manual: true });

	const onSubmit = async (values) => {
		const { mobile_number } = values || {};
		try {
			const payload = {
				mobile_number       : mobile_number?.number,
				mobile_country_code : mobile_number?.country_code,
			};

			trackEvent(APP_EVENT.auth_requested_otp_for_login, {
				mobile_country_code : payload.mobile_country_code,
				mobile_number       : payload.mobile_number,
			});

			const response = await trigger({
				data: payload,
			});

			setShowOtpForm(true);
			setUserDetails({
				userId    : response?.data?.id,
				contactNo : values?.mobile_number,
			});
		} catch (error) {
			if (error?.data?.mobile_number || error?.data?.no) {
				const message = error?.data?.mobile_number;

				showErrorsInToast(message || error?.error);
			}
		}
	};
	return {
		onSubmit,
		loading,
		setShowOtpForm,
		showOtpForm,
		userDetails,
	};
};

export default useMobileNoForm;
