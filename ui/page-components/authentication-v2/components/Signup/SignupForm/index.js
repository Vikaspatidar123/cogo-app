import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import useLeadUserDetails from '../../../hooks/useLeadUserDetails';
import useSignupAuthentication from '../../../hooks/useSignupAuthentication';
import { checkMobileInput } from '../../../utils/checkMobileInput';
import { getIdByMobileCountryCode } from '../../../utils/getIdByMobileCountryCode';
import { getlocationData } from '../../../utils/getLocationData';

import styles from './styles.module.css';

import {
	InputController,
	MobileNumberSelectController,
	useForm,
} from '@/packages/forms';
import CheckboxController from '@/packages/forms/Controlled/CheckboxController';
import CountrySelectController from '@/packages/forms/Controlled/CountrySelectController';
import patterns from '@/ui/commons/configurations/patterns';

function SignupForm({ userDetails = {}, setMode = () => {}, setUserDetails = () => {} }) {
	const [captchaResponse, setCaptchaResponse] = useState('');
	const recaptchaRef = useRef({});
	const [customError, setCustomError] = useState('');
	const [captchaError, setCaptchaError] = useState('');
	const [leadUserId, setLeadUserId] = useState('');
	const [locationData, setLocationData] = useState({});

	const {
		signupAuthentication,
		signupLoading,
	} = useSignupAuthentication({ setMode, setUserDetails, captchaResponse, leadUserId });

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

	useEffect(() => {
		const fetchData = async () => {
			const data = await getlocationData();
			setLocationData(data);
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (mobileCodeValue?.country_code) {
			const countryId = getIdByMobileCountryCode({
				mobile_country_code: mobileCodeValue.country_code,
			});
			setValue('country_id', countryId);
		}
	}, [setValue, mobileCodeValue?.country_code]);

	useEffect(() => {
		const hasMobileValues = checkMobileInput(formValues);

		if (hasMobileValues) {
			setCustomError('');
		}
	}, [formValues]);

	const checkMobileDetails = (val) => {
		const hasMobileValues = checkMobileInput(val);

		if (hasMobileValues) {
			setCustomError('');
		} else {
			setCustomError('Mobile Details are required.');
		}

		return hasMobileValues;
	};

	const checkCaptcha = (val) => {
		if (val) {
			setCaptchaError('');
			return true;
		}
		setCaptchaError('Please complete the reCAPTCHA verification.');
		return false;
	};

	const makeApiCallForEmail = async () => {
		await trigger('email');
		const { email } = formValues;
		if (email && errors.email === undefined) {
			onLeadUserDetails({ leadUserId, formValues });
		}
	};

	const makeApiCallForMobile = () => {
		const hasMobileValues = checkMobileDetails(formValues);
		const { mobile_number } = formValues;
		if (hasMobileValues && mobile_number) {
			onLeadUserDetails({ leadUserId, formValues });
		}
	};

	const onSignupApiCall = (values, e) => {
		const hasCaptchaValue = checkCaptcha(captchaResponse);
		const hasMobileValues = checkMobileDetails(values);

		if (hasCaptchaValue && hasMobileValues) {
			setUserDetails({ ...formValues });
			signupAuthentication(values, e);
		}
	};

	useEffect(() => {
		if (!isEmpty(locationData)) {
			setValue('mobile_number', { country_code: locationData.mobile_country_code || '+91' });
		}
	}, [locationData, setValue]);

	return (
		<form className={styles.form_container} onSubmit={handleSubmit(onSignupApiCall)}>

			<div className={styles.card_heading}>Welcome to Cogoport </div>

			<div className={styles.field}>
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
					Number also available on WhatsApp
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
					mode="onBlur"
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

			<div className={styles.field}>
				<div className={styles.recaptcha}>
					<ReCAPTCHA
						ref={recaptchaRef}
						sitekey="6Lde97IeAAAAAJS1_4x0dGDmjNGdKq1wVl1TR0eD"
						onChange={(value = '') => { setCaptchaResponse(value); }}
					/>
					<div className={styles.recaptcha_error}>
						{captchaError}
					</div>
				</div>
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

			<Button
				loading={signupLoading}
				type="submit"
				size="lg"
			>
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
