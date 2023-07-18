import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useSetPassword = ({ password = '', confirm_password = '', setShowModal = () => { } }) => {
	const { t } = useTranslation(['dashboard']);

	const router = useRouter();

	const {
		profile: { id: userId = '' },
	} = useSelector((state) => state);

	const [customErrors, setCustomErrors] = useState('');

	useEffect(() => {
		const toCheck = password && confirm_password;
		setCustomErrors(
			toCheck && confirm_password !== password
				? t('dashboard:setPassword_form_error') : '',

		);
	}, [password, confirm_password, t]);

	const [{ loading }, trigger] = useRequest(
		{
			url    : 'update_user',
			method : 'post',
		},
		{ manual: true },
	);

	const onSetPassword = async (values) => {
		try {
			const payload = {
				password : values?.password,
				id       : userId,
			};

			await trigger({
				data: payload,
			});

			Toast.success(t('dashboard:setPassword_success_message'));

			router.push('/dashboard');

			setShowModal(false);
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || t('dashboard:setPassword_error'),
			);
		}
	};

	return { onSetPassword, loading, customErrors };
};

export default useSetPassword;
