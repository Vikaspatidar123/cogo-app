import { Button } from '@cogoport/components';
import { useEffect, useState } from 'react';

import useLoginMobileAuthentication from '../../../hooks/useLoginMobileAuthentication';
import { checkMobileInput } from '../../../utils/checkMobileInput';
import { getlocationData } from '../../../utils/getLocationData';

import styles from './styles.module.css';

import { useForm, MobileNumberSelectController } from '@/packages/forms';

function MobileLoginForm({
	setMode = () => {},
	setMobileNumber = () => {},
	setOtpId = () => {},
	mobileNumber = {},
}) {
	const [customError, setCustomError] = useState('');
	const [locationData, setLocationData] = useState({});

	const {
		onSendOtp = () => {},
		otpLoading = false,
	} = useLoginMobileAuthentication({ setMode, setMobileNumber, setOtpId, mobileNumber });

	const { handleSubmit, control, watch } = useForm();

	const formValues = watch();

	useEffect(() => {
		const fetchData = async () => {
			const data = await getlocationData();
			setLocationData(data);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const hasValues = checkMobileInput(formValues);

		if (hasValues) {
			setCustomError('');
		}
	}, [formValues]);

	const onOtpApiCall = (values, e) => {
		const hasValues = checkMobileInput(values);

		if (hasValues) {
			setCustomError('');
			onSendOtp(values, e);
		} else {
			setCustomError('Mobile Details are required.');
		}
	};

	return (
		<form className={styles.form_container} onSubmit={handleSubmit(onOtpApiCall)}>

			<div className={styles.label}>Mobile Number</div>
			<MobileNumberSelectController
				control={control}
				name="mobile_number"
				type="mobile-number-select"
				placeholder="Enter your Number"
				rules={{ required: 'Mobile Number is required.' }}
				value={{
					country_code: locationData?.mobile_country_code || '+91',
				}}
			/>
			<div className={styles.errors}>
				{customError || ''}
			</div>

			<Button
				loading={otpLoading}
				className={styles.submit_button}
				type="submit"
				size="lg"
			>
				Get OTP
			</Button>

			<div className={styles.links}>
				<a href="/v2/signup">Create a New Account</a>
			</div>
		</form>
	);
}

export default MobileLoginForm;
