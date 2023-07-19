import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import { useRequest } from '@/packages/request';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const useSaasSignupAuthentication = ({
	setHasSignedup, setUserDetails, captchaResponse, hasWhatsApp, userInfo,
}) => {
	const { t } = useTranslation(['common']);

	const [{ loading: signupLoading }, trigger] = useRequest({
		url    : '/lead/create_sign_up_lead_user',
		method : 'post',
	}, { manual: true });

	const signupAuthentication = async (val) => {
		const { email = '', name = '', mobile_number = {} } = val;
		const payload = {
			email,
			name,
			mobile_number             : mobile_number?.number,
			mobile_country_code       : mobile_number?.country_code,
			google_recaptcha_response : captchaResponse,
			is_whatsapp_number        : hasWhatsApp,
		};
		try {
			const res = await trigger({
				data: {
					...payload,
				},
			});

			if (res?.status === 200) {
				const { data } = res || {};
				setHasSignedup(true);
				const userDetails = {
					...payload,
					...data,
					...userInfo,
				};

				setUserDetails(userDetails);
			}
		} catch (e) {
			if (isEmpty(e?.response?.data?.email)) {
				Toast.error(t('common:signup_email_error'));
			} else {
				showErrorsInToast(e?.response?.data);
			}
		}
	};

	return {
		signupLoading,
		signupAuthentication,
	};
};

export default useSaasSignupAuthentication;
