import { useEffect, useRef } from 'react';

import { getControls } from './utils/controls';

import useForm from '@/commons/hooks/useFormCogo';
import redirect from '@/commons/utils/redirect';
import { useSelector } from '@/packages/store';

const useEmail = ({ login = () => { } }) => {
	const {
		general: { query = {}, locale },
	} = useSelector((reduxState) => reduxState);

	const { email = '' } = query;

	const emailRef = useRef(null);

	const controls = getControls(emailRef);

	const formProps = useForm(controls);
	const { watch, setValue } = formProps;

	useEffect(() => {
		emailRef.current?.focus();

		if (email) {
			setValue('email', email);
		}
	}, []);

	const onSubmit = (values = {}) => {
		login({ values });
	};

	const watchEmail = watch('email');

	const onClickForgotPasswordButton = () => {
		let path = '/forgot-password';
		if (watchEmail) {
			path += `?email=${watchEmail}`;
		}

		redirect({ path, locale });
	};

	return {
		controls,
		formProps,
		errors: formProps.formState.errors,
		onSubmit,
		onClickForgotPasswordButton,
	};
};

export default useEmail;
