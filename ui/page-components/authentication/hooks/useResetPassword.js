import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useResetPassword = ({ password = '', confirm_password = '' }) => {
	const {
		general: { query = {} },
	} = useSelector((state) => state);

	const { id: emailToken = '' } = query;

	const { t } = useTranslation(['authentication']);
	const translationKey = 'authentication:resetPassword';

	const [customErrors, setCustomErrors] = useState('');

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'reset_user_password',
			method : 'post',
		},
		{ manual: true },
	);

	useEffect(() => {
		setCustomErrors(
			password
				&& confirm_password
				&& confirm_password !== password
				? t(`${translationKey}_password_mismatch`) : '',
		);
	}, [password, confirm_password, t]);

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
				getApiErrorString(err?.response?.data) || t(`${translationKey}_error`),
			);
		}
	};

	return { onResetPassword, loading, customErrors };
};

export default useResetPassword;
