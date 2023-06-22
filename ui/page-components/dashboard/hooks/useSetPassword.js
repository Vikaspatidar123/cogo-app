import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useSetPassword = ({ password = '', confirm_password = '', setShowModal = () => { } }) => {
	const router = useRouter();
	const {
		profile: { email_token = '' },
	} = useSelector((state) => state);

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

	const onSetPassword = async (values) => {
		if (isEmpty(email_token)) {
			Toast.error('Failed to Set Password, Please Try in Settings');
			return;
		}
		try {
			const payload = {
				password : values?.password,
				token    : email_token,
			};

			await trigger({
				data: payload,
			});

			Toast.success('Password Set Successfully');

			router.push(
				{
					pathname : '/[org_id]/[branch_id]/dashboard',
					query    : { mail_verify: false },
				},
				undefined,
				{ shallow: true },
			);

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
