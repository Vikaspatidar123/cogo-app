import { toast } from '@cogoport/front/components';
import { t } from 'i18next';
import React from 'react';

import { useRequest } from '@/packages/request';

const useSignupAuthentication = ({
	setHasSignedup, setUserId, captchaResponse, hasWhatsApp,
}) => {
	const [{ loading: signupLoading }, trigger] = useRequest({
		url    : '/lead/create_sign_up_lead_user',
		method : 'post',
	}, { manual: true });

	const signupAuthentication = async (val) => {
		try {
			const res = await trigger({
				data: {
					email                     : val.email,
					name                      : val.name,
					mobile_number             : val.mobile_number.number,
					mobile_country_code       : val.mobile_number.country_code,
					google_recaptcha_response : captchaResponse,
					is_whatsapp_number        : hasWhatsApp,
				},
			});

			if (res?.status === 200) {
				setHasSignedup(true);
				setUserId(res?.data);
			}

			console.log(res, 'res');
		} catch (e) {
			console.log(e, 'error');
			if (e?.response?.data?.email?.length > 0) {
				toast.error('Email id is already registered. Please Login');
			} else {
				toast.error('Something went wrong');
			}
		}
	};

	return {
		signupLoading,
		signupAuthentication,
	};
};

export default useSignupAuthentication;
