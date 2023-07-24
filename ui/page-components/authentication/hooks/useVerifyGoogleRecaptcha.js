import { useRef } from 'react';

import { useRequest } from '@/packages/request';

function useVerifyGoogleRecaptcha() {
	const recaptchaRef = useRef({});

	const [{ loading: captchaLoading }, trigger] = useRequest({
		url    : 'verify_google_recaptcha',
		method : 'get',
	}, { manual: true });

	const onVerifyingCaptcha = async () => {
		const captchaResponse = await recaptchaRef.current.executeAsync();

		trigger({ params: { google_recaptcha_response: captchaResponse } });
	};

	return {
		recaptchaRef,
		captchaLoading,
		onVerifyingCaptcha,
	};
}

export default useVerifyGoogleRecaptcha;
