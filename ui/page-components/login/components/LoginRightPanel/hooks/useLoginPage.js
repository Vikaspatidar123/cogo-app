import { useState } from 'react';

import Email from '../Email';
import MobileNo from '../MobileNo';
import CONSTANTS from '../utils/constant';

import useLogin from './useLogin';

import { useSelector } from '@/packages/store';

const {
	COMPONENT_KEYS: { MOBILE_NO, EMAIL },
} = CONSTANTS;

const useLoginPage = () => {
	const {
		general: { query = {} },
	} = useSelector((reduxState) => reduxState);

	const [loginForm, setLoginForm] = useState(() => {
		const { email = '' } = query;

		return email ? EMAIL : MOBILE_NO;
	});

	const { loading: loginApiLoading = false, login = () => { } } = useLogin({
		CONSTANTS,
		action: loginForm,
	});

	const getLoginComponent = () => {
		if (loginForm === MOBILE_NO) {
			return <MobileNo loginApiLoading={loginApiLoading} login={login} />;
		}

		return <Email loginApiLoading={loginApiLoading} login={login} />;
	};

	return {
		CONSTANTS,
		loginForm,
		setLoginForm,
		loginComponent: getLoginComponent(),
	};
};

export default useLoginPage;
