import { Toast } from '@cogoport/components';
import { useRef, useState } from 'react';

import { useRequest } from '@/packages/request';

const getFormattedPayload = ({ val, captchaResponse, leadUserId }) => {
	const { business_name, country_id } = val;

	return {
		lead_user_id              : leadUserId || undefined,
		business_name,
		country_id,
		google_recaptcha_response : captchaResponse,
	};
};

const useSignupAuthentication = ({
	setMode, setUserDetails, leadUserId,
}) => {
	const [captchaLoading, setCaptchaLoading] = useState(false);

	const recaptchaRef = useRef({});

	const [{ loading: signupLoading }, trigger] = useRequest({
		url    : 'create_lead_organization_on_sign_up',
		method : 'post',
	}, { manual: true });

	const onSignupAuthentication = async (val, e) => {
		e.preventDefault();

		try {
			setCaptchaLoading(true);

			const captchaResponse = await recaptchaRef.current.executeAsync();

			setCaptchaLoading(false);

			const payload = getFormattedPayload({ val, captchaResponse, leadUserId });

			const res = await trigger({
				data: payload,
			});

			const { data } = res || {};

			setMode('otp_form');

			setUserDetails((prev) => ({
				...prev,
				...data,
			}));
		} catch (err) {
			Toast.error((err?.response?.data?.message) || 'Failed to Signup, Please check your details once');
		}
	};

	return {
		loading: signupLoading || captchaLoading,
		onSignupAuthentication,
		recaptchaRef,
	};
};

export default useSignupAuthentication;
