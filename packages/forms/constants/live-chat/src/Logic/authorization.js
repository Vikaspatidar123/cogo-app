import { accountsSdk } from '@livechat/accounts-sdk';
import { useEffect, useState, useRef } from 'react';

const initialAuthState = {
	isLoggingIn : true,
	isLoggedIn  : false,
	agentData   : null,
};

export const useAuth = () => {
	const [auth, setAuth] = useState(initialAuthState);
	const instance = useRef(null);

	useEffect(() => {
		instance.current = accountsSdk.init({
			client_id         : process.env.LIVE_CHAT_CLIENT_ID,
			onIdentityFetched : async (error, data) => {
				if (error) {
					console.error('Authorization problem: ', error);
					instance.current.openPopup();
					setAuth(initialAuthState);
					return;
				}

				if (data && data.access_token) {
					setAuth({
						isLoggingIn : false,
						isLoggedIn  : true,
						agentData   : data,
					});
				} else {
					setAuth(initialAuthState);
					instance.current.openPopup();
				}
			},
		});
	}, []);

	return {
		...auth,
		instance: instance.current || null,
	};
};
