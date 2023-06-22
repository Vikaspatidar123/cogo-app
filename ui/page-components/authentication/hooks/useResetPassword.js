import { Toast } from '@cogoport/components';
import { useEffect, useState } from 'react';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useResetPassword = ({ password = '', confirm_password = '' }) => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { id: emailToken = '' } = query;

	const [customErrors, setCustomErrors] = useState('');

	useEffect(() => {
		setCustomErrors(
			password
				&& confirm_password
				&& confirm_password !== password
				? 'Password does not match.' : '',
		);
	}, [password, confirm_password]);

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'reset_user_password',
			method : 'post',
		},
		{ manual: true },
	);

	const onResetPassword = async (values) => {
		try {
			const payload = {
				password : values?.password,
				token    : emailToken,
			};

			await trigger({
				data: payload,
			});

			window.location.href = '/login';
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || 'Failed to Login, Please try again',
			);
		}
	};

	return { onResetPassword, loading, customErrors };
};

export default useResetPassword;
