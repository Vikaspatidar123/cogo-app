import { Button, Checkbox } from '@cogoport/components';
import { setCookie } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
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
	const { t } = useTranslation(['common']);
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
					placeholder={t('common:rightPanel_registration_controls_name_label')}
					rules={{ required: `${t('common:rightPanel_registration_controls_name_is_required')}` }}
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
					placeholder={t('common:rightPanel_tabs_email_controls_email_label')}
					rules={{ required: `${t('common:rightPanel_email_is_required')}` }}
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
					placeholder={t('common:rightPanel_tabs_mobile_controls_mobile_label')}
					mobileSelectRef={{
						...register('mobile_number', {
							required:
						`${t('common:rightPanel_registration_mobile_number_is_required')}`,
						}),
					}.ref}
				/>
				{errors.mobile_number && (
					<span className={styles.errors}>{errors.mobile_number.message || errors.mobile_number.type}</span>
				)}
			</div>

			<div className={styles.checkbox_container}>
				<Checkbox value={hasWhatsApp} onChange={handleChange} />
				{t('common:rightPanel_registration_controls_isWhatsappNumber_label')}
			</div>

			<div className={styles.terms_and_conditions_text}>
				{t('common:rightPanel_registration_links_termsAndPrivacyPolicy_label')}
				<a
					href={t('common:rightPanel_registration_links_termsAndPrivacyPolicy_links_terms_href')}
					target="_blank"
					rel="noreferrer"
					className={styles.terms_and_conditions_link}
				>
					{t('common:rightPanel_registration_links_termsAndPrivacyPolicy_links_terms_linkLabel')}
					{'  '}
				</a>
				&
				<a
					href={t('common:rightPanel_registration_links_termsAndPrivacyPolicy_links_privacyPolicy_href')}
					target="_blank"
					className={styles.terms_and_conditions_link}
					rel="noreferrer"
				>
					{t('common:rightPanel_registration_links_termsAndPrivacyPolicy_links_privacyPolicy_linkLabel')}
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
				{t('common:rightPanel_signupLink_link')}
			</Button>
			<a
				href="mailto:kanira.patel@cogoport.com"
				className={styles.right_footer_text}
			>
				{t('common:rightPanel_support_label')}
				<span className={styles.right_footer_text_span}>
					{' '}
					kanira.patel@cogoport.com
				</span>
			</a>
		</form>
	);
}

export default SignupForm;
