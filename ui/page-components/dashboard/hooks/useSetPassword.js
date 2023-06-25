import { Toast } from '@cogoport/components';
import { useEffect, useState } from 'react';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useSetPassword = ({ password = '', confirm_password = '', setShowModal = () => { } }) => {
	const router = useRouter();

	const {
		profile: { id: userId = '' },
	} = useSelector((state) => state);

	const [customErrors, setCustomErrors] = useState('');

	useEffect(() => {
		const toCheck = password && confirm_password;
		setCustomErrors(
			toCheck && confirm_password !== password
				? 'Password does not match.' : '',
		);
	}, [password, confirm_password]);

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

			Toast.success('Password Set Successfully');

			router.push(`/dashboard?mail_verify=${false}`, '/dashboard?mail_verify=false');

			setShowModal(false);
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || 'Failed to Set Password',
			);
		}
	};

	return { onSetPassword, loading, customErrors };
};

export default useSetPassword;
