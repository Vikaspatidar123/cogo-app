/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { IcMEyeopen, IcMEyeclose } from '@cogoport/icons-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import getControls from './controls';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';

const getPasswordInputSuffix = ({ type = 'password', setType = () => {} }) => {
	let suffix = <IcMEyeopen onClick={() => setType('text')} style={{ marginRight: '10px' }} />;
	if (type === 'text') {
		suffix = <IcMEyeclose onClick={() => setType('password')} style={{ marginRight: '10px' }} />;
	}

	return suffix;
};

const useResetPassword = ({
	setShowPasswordModal = () => {},
	refetch = () => {},
}) => {
	const { t } = useTranslation(['settings']);

	const [passwordInputType, setPasswordInputType] = useState('password');

	const [confirmPasswordInputType, setConfirmPasswordInputType] =		useState('password');

	const [errors, setErrors] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/update_user',
		method : 'post',
	}, { manual: false });

	const controls = getControls({ t });

	const newControls = useMemo(() => controls?.map((control) => {
		const { name = '' } = control;

		if (!['password', 'confirmPassword'].includes(name)) return { ...control };

		const passwordTypeRef = name === 'password' ? passwordInputType : confirmPasswordInputType;
		const setPasswordTypeRef =	name === 'password'
			? setPasswordInputType
			: setConfirmPasswordInputType;

		return {
			...control,
			type   : passwordTypeRef,
			suffix : getPasswordInputSuffix({
				type    : passwordTypeRef,
				setType : setPasswordTypeRef,
			}),
		};
	}), [passwordInputType, confirmPasswordInputType]);

	const formProps = useForm();
	const fields = newControls;

	const watchPassword = formProps.watch('password');
	const watchConfirmPassword = formProps.watch('confirmPassword');

	useEffect(() => {
		setErrors((previousErrors) => ({
			...previousErrors,
			password: {
				type    : '',
				message : '',
			},
		}));
	}, [watchPassword]);

	useEffect(() => {
		setErrors((previousErrors) => ({
			...previousErrors,
			confirmPassword: {
				type: '',
				message:
					watchConfirmPassword && watchConfirmPassword !== watchPassword
						? ''

						: '',
			},
		}));
	}, [watchPassword, watchConfirmPassword]);

	const onErrors = (errs = {}) => setErrors({ ...errs });

	const isPasswordsMatching = ({ password = '', confirmPassword = '' }) => {
		if (confirmPassword === password) return true;

		setErrors((previousErrors) => ({
			...previousErrors,
			confirmPassword: {
				type    : 'custom',
				message : 'password does not match',
			},
		}));

		return false;
	};

	const handleResetPasswordError = (error = {}) => {
		Toast.error(error?.error);
	};

	const resetPassword = async (values = {}) => {
		try {
			const payload = {
				...values,
			};

			await trigger({
				data: payload,
			});

			setShowPasswordModal(false);
			refetch();

			Toast.success(t('settings:billing_details_successfully_updated_toast'));
		} catch (error) {
			handleResetPasswordError(error);
		}
	};

	const onSubmit = (values = {}) => {
		const { password = '', confirmPassword = '' } = values;

		if (!isPasswordsMatching({ password, confirmPassword })) return;

		setErrors({});

		resetPassword({ password });
	};

	return {
		fields,
		controls,
		formProps,
		errors,
		onSubmit,
		onErrors,
		loading,
	};
};

export default useResetPassword;
