import { Toast } from '@cogoport/components';
import { useEffect, useRef, useState } from 'react';

import { getControls } from './utils/controls';

import useForm from '@/commons/hooks/useFormCogo';
import useSendMobileNumberOtp from '@/commons/hooks/useSendMobileNumberOtp';
import { useSelector } from '@/packages/store';

const useMobileNo = ({ OTP_LENGTH, login = () => { } }) => {
	const {
		general: { query = {} },
	} = useSelector((reduxState) => reduxState);

	const { mobile_number = '', country_code = '' } = query;

	const [userId, setUserId] = useState('');
	const [showOtpInputs, setShowOtpInputs] = useState(false);
	const [otp, setOtp] = useState('');

	const mobileSelectRef = useRef(null);

	const controls = getControls(mobileSelectRef);

	const formProps = useForm(controls);
	const {
		watch = () => { },
		setValue = () => { },
		setError = () => { },
	} = formProps;

	const { loading: sendOtpApiLoading = false, sendOtp = () => { } } = useSendMobileNumberOtp();

	useEffect(() => {
		mobileSelectRef.current?.focus();

		setValue('mobile', {
			mobileCountryCode: country_code,
			mobileNumber: mobile_number,
		});
	}, []);

	const watchMobile = watch('mobile');

	useEffect(() => {
		setUserId('');
		setShowOtpInputs(false);
		setOtp('');
	}, [watchMobile]);

	const isOtpInputEntered = () => {
		if (otp.length === OTP_LENGTH) {
			return true;
		}

		Toast.info('Please provide OTP.');

		return false;
	};

	const onSubmitVerifyOtp = () => {
		const isFormValid = isOtpInputEntered();

		if (!isFormValid) {
			return;
		}

		login({
			values: {
				...watchMobile,
				otp,
				userId,
			},
		});
	};

	const onSubmitSendOtp = () => {
		const { mobileCountryCode = '', mobileNumber = '' } = watchMobile;

		const payload = {
			mobile_country_code: mobileCountryCode,
			mobile_number: mobileNumber,
			platform: 'partner',
		};

		sendOtp({
			action: 'send',
			payload,
			onSuccessCallback: (response) => {
				setUserId(response.id);
				setShowOtpInputs(true);
			},
			onFailureCallback: ({ error = {}, showError = () => { } }) => {
				if (Object.keys(error.data || {}).includes('no')) {
					setError('mobile', {
						type: 'custom',
						message: 'Mobile Number is incorrect',
					});
				} else {
					showError();
				}
			},
		});
	};

	const onSubmit = () => {
		if (showOtpInputs) {
			onSubmitVerifyOtp();
		} else {
			onSubmitSendOtp();
		}
	};

	const onClickResendOtpButton = ({ timer = {} }) => {
		const { mobileCountryCode = '', mobileNumber = '' } = watchMobile;

		const payload = {
			mobile_country_code: mobileCountryCode,
			mobile_number: mobileNumber,
			platform: 'partner',
		};

		sendOtp({
			action: 'send',
			payload,
			onSuccessCallback: () => timer.restart(),
		});
	};

	const props = {
		controls,
		formProps,
		errors: formProps.formState.errors,
		onSubmit,
		showOtpInputs,
		setOtp,
		sendOtpApiLoading,
		onClickResendOtpButton,
	};

	return {
		...props,
	};
};

export default useMobileNo;
