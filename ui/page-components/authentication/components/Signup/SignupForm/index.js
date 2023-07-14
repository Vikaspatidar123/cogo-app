import { Button } from '@cogoport/components';
import { IcCWhatsapp, IcMArrowRight } from '@cogoport/icons-react';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import useLeadUserDetails from '../../../hooks/useLeadUserDetails';
import useSignupAuthentication from '../../../hooks/useSignupAuthentication';
import useSignupForm from '../../../hooks/useSignupForm';

import styles from './styles.module.css';

import {
	InputController,
	MobileNumberSelectController,
	useForm,
} from '@/packages/forms';
import CheckboxController from '@/packages/forms/Controlled/CheckboxController';
import CountrySelectController from '@/packages/forms/Controlled/CountrySelectController';
import { useRouter } from '@/packages/next';
import patterns from '@/ui/commons/configurations/patterns';

function SignupForm({ userDetails = {}, setMode = () => { }, setUserDetails = () => { } }) {
	const { locale } = useRouter();
	const [customError, setCustomError] = useState('');
	const [leadUserId, setLeadUserId] = useState('');

	const {
		signupAuthentication,
		loading,
		recaptchaRef,
	} = useSignupAuthentication({ setMode, setUserDetails, leadUserId });

	const { onLeadUserDetails } = useLeadUserDetails({ setLeadUserId });

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

	const mobileCodeValue = watch('mobile_number');

	const { onSignupApiCall, makeApiCallForEmail, makeApiCallForMobile } = useSignupForm({
		setCustomError,
		trigger,
		errors,
		setValue,
		formValues,
		mobileCodeValue,
		onLeadUserDetails,
		leadUserId,
		setUserDetails,
		signupAuthentication,
	});

	return (
		<form className={styles.form_container} onSubmit={handleSubmit(onSignupApiCall)}>
			<h2 className={styles.card_heading}>Welcome to Cogoport </h2>

			<div className={styles.field}>
				<div className={styles.label}>Full Name</div>
				<InputController
					control={control}
					name="name"
					type="text"
					placeholder="Enter your Full Name"
					rules={{ required: 'Name is required.' }}
				/>
				<span className={styles.errors}>
					{errors?.name?.message || ' '}
				</span>
			</div>

			<div className={styles.field}>
				<div className={styles.label}>Email Address</div>
				<InputController
					control={control}
					name="email"
					type="email"
					placeholder="Enter your Email"
					rules={{
						required : 'Email is required.',
						pattern  : {
							value   : patterns.EMAIL,
							message : 'Email is invalid.',
						},
					}}
					mode="onBlur"
					onBlur={makeApiCallForEmail}
				/>
				<span className={styles.errors}>
					{errors?.email?.message || ' '}
				</span>
			</div>

			<div className={styles.field}>
				<div className={styles.label}>Mobile Number</div>
				<MobileNumberSelectController
					control={control}
					name="mobile_number"
					placeholder="Enter your Mobile Number"
					rules={{
						required: 'Mobile Number is required.',
					}}
					mode="onBlur"
					onBlur={makeApiCallForMobile}
				/>
				<span className={styles.errors}>
					{customError || ''}
				</span>
			</div>

			<div className={styles.field}>
				<div className={styles.checkbox_container}>
					<CheckboxController
						control={control}
						name="is_whatsapp_number"
						className={styles.checkbox}
					/>
					Number also available on
					{' '}
					<IcCWhatsapp height={20} width={20} />
					{' '}
					WhatsApp

				</div>
			</div>

			<div className={styles.field}>
				<div className={styles.label}>Company Name</div>
				<InputController
					control={control}
					name="business_name"
					type="text"
					placeholder="Enter your Company Name"
					rules={{ required: 'Company Name is required.' }}
				/>
				<span className={styles.errors}>
					{errors?.business_name?.message || ' '}
				</span>

			</div>

			<div className={styles.field}>
				<div className={styles.label}>Country of Registration</div>
				<CountrySelectController
					control={control}
					name="country_id"
					placeholder="Enter Country of Registration"
					rules={{ required: 'Country is required.' }}
				/>
				<span className={styles.errors}>
					{errors?.country_id?.message || ' '}
				</span>
			</div>

			<div className={styles.field_captcha}>
				<div className={styles.recaptcha}>
					<ReCAPTCHA
						ref={recaptchaRef}
						sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
						size="invisible"
					/>
				</div>
			</div>

			<div className={styles.tnc_link}>
				By signing up, you are accepting the
				{'  '}
				<a
					href={`https://www.cogoport.com/${locale}/terms-and-conditions/`}
					target="_blank"
					rel="noreferrer"
				>
					Terms and Conditions
					{'  '}

				</a>
				&
				{'  '}
				<a
					href={`https://www.cogoport.com/${locale}/privacy-policy/`}
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
				Get Started
				{' '}
				<IcMArrowRight />
			</Button>

			<div className={styles.links}>
				<a href="/login">Already have an Account?</a>
			</div>
		</form>
	);
}

export default SignupForm;
