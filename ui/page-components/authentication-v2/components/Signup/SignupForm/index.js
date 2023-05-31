import { Checkbox, Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import useSignupAuthentication from '../../../hooks/useSignupAuthentication';

import styles from './styles.module.css';

import { InputController, MobileNumberSelectController, useForm } from '@/packages/forms';
import CountrySelectController from '@/packages/forms/Controlled/CountrySelectController';
import patterns from '@/ui/commons/configurations/patterns';

function SignupForm({ setshowOtpForm = () => {}, setFormData = () => {} }) {
	const {
		handleSubmit, formState: { errors }, control, watch, isValid,
	} = useForm({ mode: 'onBlur' });

	const [captchaResponse, setCaptchaResponse] = useState('');
	const [hasWhatsApp, setHasWhatsApp] = useState(false);
	const recaptchaRef = useRef({});

	const {
		signupAuthentication,
		signupLoading,
	} = useSignupAuthentication({ setshowOtpForm, captchaResponse, hasWhatsApp });

	const formValues = watch();

	const makeApiCallForEmail = () => {
		console.log('Checking API call for Email');
		const { name, email } = formValues;
		if (name && email) {
			console.log('Making API call for Email');
		}
	};

	const makeApiCallForMobile = () => {
		console.log('Checking API Call for Mobile');
		const { name, email, mobile } = formValues;
		if (name && mobile) {
			console.log('Making API Call for Mobile');
		}
	};

	return (
		<form className={styles.form_container} onSubmit={handleSubmit(signupAuthentication)}>

			<div className={styles.label}>Full Name</div>
			<InputController
				control={control}
				name="name"
				type="text"
				placeholder="Enter your Full Name"
				rules={{ required: 'Name is required.' }}
				mode="onBlur"
			/>
			<span className={styles.errors}>
				{errors?.name?.message || ' '}
			</span>

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

			<div className={styles.label}>Mobile Number</div>
			<MobileNumberSelectController
				control={control}
				name="mobile_number"
				type="mobile-number-select"
				placeholder="Enter your Mobile Number"
				rules={{
					required : 'Number is required.',
					pattern  : {
						value   : /^[0-9]{10}$/,
						message : 'Number is invalid.',
					},
				}}
				mode="onBlur"
				onBlur={makeApiCallForMobile}
			/>
			<span className={styles.errors}>
				{errors?.mobile_number?.message || ' '}
			</span>

			<div className={styles.checkbox_container}>
				<Checkbox
					value={hasWhatsApp}
					onChange={() => { setHasWhatsApp(!hasWhatsApp); }}
					className={styles.checkbox}
				/>
				Number also available on WhatsApp
			</div>

			<div className={styles.label}>Company Name</div>
			<InputController
				control={control}
				name="company_name"
				type="text"
				placeholder="Enter your Company Name"
				rules={{ required: 'Company Name is required.' }}
				mode="onBlur"
			/>
			<span className={styles.errors}>
				{errors?.company_name?.message || ' '}
			</span>

			<div className={styles.label}>Country of Registration</div>
			<CountrySelectController
				control={control}
				name="country"
				placeholder="Enter Country of Registration"
				rules={{ required: 'Country is required.' }}
				mode="onBlur"
			/>
			<span className={styles.errors}>
				{errors?.country?.message || ' '}
			</span>

			<div className={styles.recaptcha}>
				<ReCAPTCHA
					ref={recaptchaRef}
					sitekey="6Lde97IeAAAAAJS1_4x0dGDmjNGdKq1wVl1TR0eD"
					onChange={(value = '') => { setCaptchaResponse(value); }}
				/>
			</div>

			<div className={styles.tnc_link}>
				By signing up, you are accepting the
				{'  '}
				<a
					href="https://www.cogoport.com/en-IN/terms-and-conditions/"
					target="_blank"
					rel="noreferrer"
				>
					Terms of Use
					{'  '}

				</a>
				&
				{'  '}
				<a
					href="https://www.cogoport.com/en-IN/privacy-policy/"
					target="_blank"
					rel="noreferrer"
				>
					Privacy Policy.
				</a>
			</div>

			<Button type="submit" size="lg" onClick={() => { setFormData(formValues); }}>
				Get Started
				{' '}
				<IcMArrowRight />
			</Button>

			<div className={styles.links}>
				<a href="/v2/login">Already have an Account?</a>
			</div>
		</form>
	);
}

export default SignupForm;
