/* eslint-disable no-undef */
import { useState } from 'react';

import { useRequest } from '@/packages/request';

const useFormLoginwithMS = () => {
	const [responseUrl, setResponseUrl] = useState({});

	const [{ loading: socialLoginLoading }, trigger] = useRequest(
		{
			url    : '/get_user_social_login_link',
			method : 'get',
		},
		{ manual: true },
	);

	const openDocument = (url) => {
		let modifiedUrl = `https://v1/${url}`;

		if (url?.includes('http://') || url?.includes('https://')) {
			modifiedUrl = url;
		}

		window.location.href = modifiedUrl;
	};

	const onLogin = async () => {
		try {
			const params = {
				auth_scope: 'app',
				// auth_platform : 'microsoft',
				// platform      : 'admin',
			};

			const response = await trigger({
				params,
			});

			openDocument(response.data.link);

			setResponseUrl(response);
		} catch (e) {
			console.log(e);
		}
	};

	return {
		onLogin,
		responseUrl,
		socialLoginLoading,
	};
};

export default useFormLoginwithMS;
