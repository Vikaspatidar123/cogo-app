import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useVerifyGoogleRecaptcha from './useVerifyGoogleRecaptcha';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const getFormattedPayload = async ({ val, leadUserId, recaptchaRef }) => {
	const { name, email, business_name, country_id, mobile_number, is_whatsapp_number } = val || {};
	const google_recaptcha_response = await recaptchaRef?.current?.executeAsync();

	return {
		lead_user_id        : leadUserId || undefined,
		name,
		email,
		mobile_country_code : mobile_number.country_code,
		mobile_number       : mobile_number.number,
		is_whatsapp_number,
		business_name,
		country_id,
		google_recaptcha_response,
	};
};

const useSignupAuthentication = ({
	setMode, setUserDetails, leadUserId, recaptchaRef,
}) => {
	const { t } = useTranslation(['authentication']);

	const {
		captchaLoading,
		onVerifyingCaptcha,
	} = useVerifyGoogleRecaptcha({ recaptchaRef });

	const [{ loading }, trigger] = useRequest({
		url    : '/create_lead_organization_on_sign_up',
		method : 'post',
	}, { manual: true });

	const onSignupAuthentication = async (val, e) => {
		e.preventDefault();

		try {
			// const captchaRes = await onVerifyingCaptcha();

			// if (captchaRes?.data) {
			const payload = await getFormattedPayload({ val, leadUserId, recaptchaRef });

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
		} finally {
			recaptchaRef?.current?.reset();
		}
	};

	return {
		loading,
		onSignupAuthentication,
		recaptchaRef,
		captchaLoading,
	};
};

export default useSignupAuthentication;
