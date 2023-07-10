import { Button, Checkbox } from '@cogoport/components';
import { setCookie } from '@cogoport/utils';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import getSaasUserInfo from '../../../hooks/useSaasUserInfo';
import useSignupAuthentication from '../../../hooks/useSignupAuthentication';

import styles from './styles.module.css';

import {
	useForm,
	InputController,
	MobileNumberSelectController,
} from '@/packages/forms';
import { useRouter } from '@/packages/next';
import setCookieAndRedirect from '@/ui/commons/utils/setCookieAndRedirect';

function SignupForm({ setHasSignedup, setFormData, setUserDetails }) {
	const {
		handleSubmit,
		formState: { errors },
		control,
		watch,
		setValue,
		register,
	} = useForm();
	const { query } = useRouter();

	const [captchaResponse, setCaptchaResponse] = useState('');
	const [hasWhatsApp, setHasWhatsApp] = useState(false);
	const [userInfo, setUserInfo] = useState({});

	const recaptchaRef = useRef({});

	const { signupAuthentication, signupLoading } = useSignupAuthentication({
		setHasSignedup,
		setUserDetails,
		captchaResponse,
		hasWhatsApp,
		userInfo,
	});

	const onChange = (value = '') => {
		setCaptchaResponse(value);
	};

	const handleChange = () => {
		setHasWhatsApp(!hasWhatsApp);
	};

	const formValues = watch();

	const handleClick = () => {
		setFormData(formValues);
	};
	const {
		token: email_token,
		lead_organization_id,
		// lead_action_id
		source,
	} = query;
	const check = source === 'quick_quotation';
	const saasInfo = useCallback(async () => {
		try {
			const response = await getSaasUserInfo({
				email_token,
				is_saas_partner: check,
			});
			const { data } = response || {};
			// if (response) {
			// 	setLoadingCheck(false);
			// }
			if (data) {
				const { name = '', email = '' } = data || {};
				setUserInfo(response?.data);
				setValue('name', name);
				setValue('email', email);
			}
			const redirectUrl = `/get-started?saastheme&lead_organization_id=${lead_organization_id}&source=${
				source || 'subscriptions'
			}`;
			const { user_session, skip_mobile_verification } = data || {};
			const { token } = user_session || {};
			setCookie('cogo-auth-token', token, 2000, {});

			if (response && skip_mobile_verification) {
				setCookieAndRedirect(token, {}, redirectUrl);
			}
		} catch (err) {
			console.log(err);
		}
	}, [check, email_token, lead_organization_id, setValue, source]);

	useEffect(() => {
		saasInfo();
	}, [query, saasInfo]);

	return (
		<form
			className={styles.form_container}
			onSubmit={handleSubmit(signupAuthentication)}
		>
			<div className={styles.input_container}>
				<InputController
					control={control}
					name="name"
					type="text"
					placeholder="Name"
					rules={{ required: 'Name is required.' }}
				/>

				{errors.name && (
					<span className={styles.errors}>{errors.name.message}</span>
				)}
			</div>
			<div className={styles.input_container}>
				<InputController
					control={control}
					name="email"
					type="email"
					placeholder="Email"
					rules={{ required: 'Email is required.' }}
					disabled
				/>

				{errors.email && (
					<span className={styles.errors}>{errors.email.message}</span>
				)}
			</div>

			<div className={styles.mobile_number_select_container}>
				<MobileNumberSelectController
					control={control}
					name="mobile_number"
					type="mobile-number-select"
					placeholder="Mobile Number"
					mobileSelectRef={{ ...register('mobile_number', { required: 'Number is required.' }) }.ref}
				/>
				{errors.mobile_number && (
					<span className={styles.errors}>{errors.mobile_number.message || errors.mobile_number.type}</span>
				)}
			</div>

			<div className={styles.checkbox_container}>
				<Checkbox value={hasWhatsApp} onChange={handleChange} />
				Number also available on WhatsApp
			</div>

			<div className={styles.terms_and_conditions_text}>
				By clicking on SUBMIT, you are accepting the
				<a
					href="https://www.cogoport.com/en-IN/terms-and-conditions/"
					target="_blank"
					rel="noreferrer"
					className={styles.terms_and_conditions_link}
				>
					Terms of Use
					{'  '}
				</a>
				&
				<a
					href="https://www.cogoport.com/en-IN/privacy-policy/"
					target="_blank"
					className={styles.terms_and_conditions_link}
					rel="noreferrer"
				>
					Privacy Policy.
				</a>
			</div>

			<div className={styles.recaptcha_container}>
				<ReCAPTCHA
					ref={recaptchaRef}
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
					onChange={onChange}
				/>
			</div>

			<Button
				loading={signupLoading}
				className={styles.submit_button}
				type="submit"
				size="lg"
				onClick={handleClick}
			>
				SignUp
			</Button>
			<a
				href="mailto:kanira.patel@cogoport.com"
				className={styles.right_footer_text}
			>
				If you have any trouble logging in, email here -
				<span className={styles.right_footer_text_span}>
					{' '}
					kanira.patel@cogoport.com
				</span>
			</a>
		</form>
	);
}

export default SignupForm;
