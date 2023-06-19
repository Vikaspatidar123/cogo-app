/* eslint-disable react-hooks/exhaustive-deps */
import { Toast } from '@cogoport/components';
import { useEffect, useMemo, useState } from 'react';

import getControls from './controls';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useMobileNoVerification = ({ type = '' }) => {
	const {
		profile: {
			mobile_country_code: mobileCountryCode = '',
			mobile_number: mobileNumber = '',
		},
	} = useSelector((state) => state);

	const [errors, setErrors] = useState({});
	const [showEnterOtpComponent, setShowEnterOtpComponent] = useState(false);
	const [otpNumber, setOtpNumber] = useState('');

	const [{ loading }, trigger] = useRequest(
		{
			url: '/update_user',
			method: 'post',
		},
		{ manual: false },
	);

	const controls = getControls();

	const newControls = useMemo(
		() => controls?.map((control) => {
			if (control?.name === 'mobileNumber' && type === 'verify') {
				return {
					...control,
					value: {
						country_code: mobileCountryCode || control?.value?.country_code,
						number: mobileNumber || control?.value?.number || '',
					},
				};
			}

			return { ...control };
		}),
		[controls, mobileCountryCode, mobileNumber],
	);

	const formProps = useForm();

	const watchMobileNumberControl = formProps.watch('mobileNumber');

	useEffect(() => {
		if (showEnterOtpComponent) setShowEnterOtpComponent(false);
	}, [watchMobileNumberControl]);

	const verifyMobileNumber = async ({ actionType = {}, ...restProps }) => {
		try {
			const values = formProps.getValues();

			let payload = {
				mobile_country_code: values?.mobileNumber?.country_code,
				mobile_number: values?.mobileNumber?.number,
			};
			if (actionType === 'VERIFY_OTP') {
				payload = { ...payload, mobile_otp: otpNumber };
			}

			await trigger({ data: payload });

			if (actionType === 'SEND_OTP') {
				setShowEnterOtpComponent(true);
				restProps?.timer?.restart?.();
			}

			if (actionType === 'VERIFY_OTP') {
				Toast.success('Verify Mobile Number');

				// eslint-disable-next-line no-undef
				window.location.reload();
			}
		} catch (error) {
			Toast.error(error.data);
		}
	};

	const sendOtpNumber = ({ timer = {} }) => verifyMobileNumber({ actionType: 'SEND_OTP', timer });

	const verifyOtpNumber = () => verifyMobileNumber({ actionType: 'VERIFY_OTP' });

	const onSubmit = () => sendOtpNumber({});

	const onErrors = (errs = {}) => setErrors({ ...errs });

	return {
		controls: newControls,
		formProps,
		errors,
		onSubmit,
		onErrors,
		showEnterOtpComponent,
		otpNumber,
		setOtpNumber,
		sendOtpNumber,
		verifyOtpNumber,
		loading,
	};
};

export default useMobileNoVerification;
