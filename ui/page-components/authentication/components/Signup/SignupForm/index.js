import { Button } from '@cogoport/components';
import { IcCWhatsapp, IcMArrowRight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import useLeadUserDetails from '../../../hooks/useLeadUserDetails';
import useSignupAuthentication from '../../../hooks/useSignupAuthentication';
import useSignupForm from '../../../hooks/useSignupForm';
import getFormattedPayload from '../../../utils/getFormattedPayload';

import styles from './styles.module.css';
import validateMobileNumber from './validateMobileNumber';

import {
	InputController,
	MobileNumberSelectController,
	useForm,
} from '@/packages/forms';
import CheckboxController from '@/packages/forms/Controlled/CheckboxController';
import CountrySelectController from '@/packages/forms/Controlled/CountrySelectController';
import { Link, useRouter } from '@/packages/next';
import patterns from '@/ui/commons/configurations/patterns';

const COGOPORT_URL = 'https://www.cogoport.com';

function SignupForm({
	userDetails = {},
	leadUserId = '',
	setMode = () => {},
	setUserDetails = () => {},
	setLeadUserId = () => {},
}) {
	const { locale } = useRouter();
	const { t } = useTranslation(['authentication']);
	const translationKey = 'authentication:signupField';
	const [captchaResponse, setCaptchaResponse] = useState('');
	const [isBlur, setIsBlur] = useState(true);

	const [customError, setCustomError] = useState('');
	const onReCaptca = (value) => {
		setCaptchaResponse(value);
	};
	const {
		loading,
		onSignupAuthentication,
	} = useSignupAuthentication({ setMode, setUserDetails, leadUserId, captchaResponse });

	const { onLeadUserDetails, fetchLeadUserTrigger } = useLeadUserDetails({
		setLeadUserId,
		t,
	});

	const {
		handleSubmit,
		formState: { errors },
		trigger,
		control,
		watch,
		setValue,
	} = useForm({
		defaultValues: {
			...userDetails,
		},
		mode: 'onBlur',
	});
	const formValues = watch();

	const mobileCheck = formValues?.mobile_number?.number;

	const { onSignupApiCall, generateSignUpLeadUser, onWhatsappChange } = useSignupForm({
		setCustomError,
		customError,
		trigger,
		setValue,
		formValues,
		onLeadUserDetails,
		leadUserId,
		setUserDetails,
		onSignupAuthentication,
		t,
	});

	return (
		<form className={styles.form_container} onSubmit={handleSubmit(onSignupApiCall)}>
			<h2 className={styles.card_heading}>
				{t(`${translationKey}_title`)}
			</h2>

			<div className={styles.field}>
				<div className={styles.label}>{t(`${translationKey}_name_label`)}</div>
				<InputController
					control={control}
					name="name"
					type="text"
					placeholder={t(`${translationKey}_name_placeholder`)}
					rules={{ required: t(`${translationKey}_name_error`) }}
					mode="onBlur"
					handleBlur={() => isBlur && generateSignUpLeadUser({ source: 'name' })}
				/>
				<span className={styles.errors}>
					{errors?.name?.message || ' '}
				</span>
			</div>

			<div className={styles.field}>
				<div className={styles.label}>{t(`${translationKey}_email_label`)}</div>
				<InputController
					control={control}
					name="email"
					type="email"
					placeholder={t(`${translationKey}_email_placeholder`)}
					rules={{
						required : t(`${translationKey}_email_error`),
						pattern  : {
							value   : patterns.EMAIL,
							message : t(`${translationKey}_email_error_1`),
						},
					}}
					mode="onBlur"
					handleBlur={() => isBlur && generateSignUpLeadUser({ source: 'email' })}
				/>
				<span className={styles.errors}>
					{errors?.email?.message || ' '}
				</span>
			</div>

			<div className={styles.field}>
				<div className={styles.label}>{t(`${translationKey}_mobile_label`)}</div>

				<MobileNumberSelectController
					control={control}
					name="mobile_number"
					placeholder={t(`${translationKey}_mobile_placeholder`)}
					rules={{
						required: t(`${translationKey}_mobile_error`),
					}}
					mode="onBlur"
					handleBlur={() => (isBlur && mobileCheck ? validateMobileNumber({
						payload: getFormattedPayload({ formValues, leadUserId }),
						setCustomError,
						fetchLeadUserTrigger,
						t,
					}) : null)}
				/>

				<span className={styles.errors}>
					{errors?.mobile_number?.message || ' '}
				</span>
			</div>

			<div className={styles.field}>
				<div
					className={styles.checkbox_container}
					onMouseEnter={() => setIsBlur(false)}
					onMouseLeave={() => setIsBlur(true)}
				>
					<CheckboxController
						control={control}
						name="is_whatsapp_number"
						className={styles.checkbox}
						handleChange={(e) => {
							onWhatsappChange({ value: e.target.checked });
						}}

					/>
					{t(`${translationKey}_whatsapp_text`)}
					<IcCWhatsapp height={20} width={20} />
					WhatsApp
				</div>
			</div>

			<div className={styles.field}>
				<div className={styles.label}>{t(`${translationKey}_company_label`)}</div>
				<InputController
					control={control}
					name="business_name"
					type="text"
					placeholder={t(`${translationKey}_company_placeholder`)}
					rules={{ required: t(`${translationKey}_company_error`) }}
				/>
				<span className={styles.errors}>
					{errors?.business_name?.message || ' '}
				</span>

			</div>

			<div className={styles.field}>
				<div className={styles.label}>{t(`${translationKey}_country_label`)}</div>
				<CountrySelectController
					control={control}
					name="country_id"
					placeholder={t(`${translationKey}_country_placeholder`)}
					rules={{ required: t(`${translationKey}_company_error`) }}
				/>
				<span className={styles.errors}>
					{errors?.country_id?.message || ' '}
				</span>
			</div>

			<div className={styles.field}>
				<div className={styles.recaptcha}>
					<ReCAPTCHA
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
						onChange={onReCaptca}
					/>
				</div>
			</div>

			<div className={styles.tnc_link}>
				{t('authentication:signup_footer_text')}
				{'  '}
				<a
					href={`${COGOPORT_URL}/${locale}/terms-and-conditions/`}
					target="_blank"
					rel="noreferrer"
				>
					Terms and Conditions
					{'  '}
				</a>
				&
				{'  '}
				<a
					href={`${COGOPORT_URL}/${locale}/privacy-policy/`}
					target="_blank"
					rel="noreferrer"
				>
					Privacy Policy
				</a>
			</div>

			<Button
				loading={loading}
				type="submit"
				size="lg"
			>
				{t('authentication:signup_submitButton_label')}
				{' '}
				<IcMArrowRight />
			</Button>

			<div className={styles.links}>
				<Link href="/login">{t('authentication:signup_link_login_label')}</Link>
			</div>
		</form>
	);
}

export default SignupForm;
