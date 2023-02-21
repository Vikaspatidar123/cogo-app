import { Toast } from '@cogoport/components';
import { IcMEyeopen, IcMEyeclose } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';

import getControls from './controls';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';

const getPasswordInputSuffix = ({ type = 'password', setType = () => {} }) => {
	let suffix = <IcMEyeopen onClick={() => setType('text')} />;
	if (type === 'text') {
		suffix = <IcMEyeclose onClick={() => setType('password')} />;
	}

	return suffix;
};

const useResetPassword = ({
	setShowPasswordModal = () => {},
	refetch = () => {},
}) => {
	const [passwordInputType, setPasswordInputType] = useState('password');

	const [confirmPasswordInputType, setConfirmPasswordInputType] =		useState('password');

	const [errors, setErrors] = useState({});

	const { t } = useTranslation(['profile']);

	// const updateUserPasswordAPI = useRequest(
	// 	'post',
	// 	false,
	// 	'partner',
	// )('/update_channel_partner_user_password');

	const controls = getControls({ t });

	const newControls = useMemo(() => controls?.map((control) => {
		const { name = '' } = control;

		if (!['password', 'confirmPassword'].includes(name)) return { ...control };

		const passwordTypeRef =				name === 'password' ? passwordInputType : confirmPasswordInputType;
		const setPasswordTypeRef =				name === 'password'
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
				type    : 'custom',
				message : '',
			},
		}));
	}, [watchPassword]);

	useEffect(() => {
		setErrors((previousErrors) => ({
			...previousErrors,
			confirmPassword: {
				type    : 'custom',
				message :
					watchConfirmPassword && watchConfirmPassword !== watchPassword
						? 'Details.tabOptions.profile.resetPassword.errorMessage'

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
				message : 'ls.tabOptions.profile.resetPassword.er',
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

			// await updateUserPasswordAPI.trigger({
			// 	data: payload,
			// });

			setShowPasswordModal(false);
			refetch();

			Toast.success(
				'ntDetails.tabOptions.profile.r',
			);
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
		controls,
		formProps,
		errors,
		onSubmit,
		onErrors,
		// loading: updateUserPasswordAPI?.loading,
	};
};

export default useResetPassword;
