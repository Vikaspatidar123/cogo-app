import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useRef, useState } from 'react';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const getFormattedPayload = ({ val, captchaResponse, leadUserId }) => {
	const { name, email, business_name, country_id, mobile_number, is_whatsapp_number } = val || {};

	return {
		lead_user_id              : leadUserId || undefined,
		name,
		email,
		mobile_country_code       : mobile_number.country_code,
		mobile_number             : mobile_number.number,
		is_whatsapp_number,
		business_name,
		country_id,
		google_recaptcha_response : captchaResponse,
	};
};

const useSignupAuthentication = ({
	setMode, setUserDetails, leadUserId,
}) => {
	const { t } = useTranslation(['authentication']);

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
			Toast.error(getApiErrorString(err?.response?.data) || t('authentication:signup_error_message'));
		}
	};

	return {
		loading: signupLoading || captchaLoading,
		onSignupAuthentication,
		recaptchaRef,
	};
};

export default useSignupAuthentication;
