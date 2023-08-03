import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const getFormattedPayload = ({ val, leadUserId, captchaResponse }) => {
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
	setMode, setUserDetails, leadUserId, captchaResponse, ipAddress,
}) => {
	const { t } = useTranslation(['authentication']);

	const [{ loading }, trigger] = useRequest({
		url    : '/create_lead_organization_on_sign_up',
		method : 'post',
	}, { manual: true });

	const onSignupAuthentication = async (val, e) => {
		e.preventDefault();

		try {
			const payload = await getFormattedPayload({ val, leadUserId, captchaResponse });
			const res = await trigger({
				data   : payload,
				params : { request_ip: ipAddress },
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
		loading,
		onSignupAuthentication,
	};
};

export default useSignupAuthentication;
