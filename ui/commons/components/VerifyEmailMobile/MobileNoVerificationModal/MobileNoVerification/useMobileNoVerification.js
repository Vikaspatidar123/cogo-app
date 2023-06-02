import { Toast } from '@cogoport/components';
import { useEffect, useMemo, useState } from 'react';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import getGeoConstants from '@/ui/commons/constants/geo';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const geo = getGeoConstants();

const getControls = () => [
	{
		name        : 'mobileNumber',
		label       : 'Mobile Number',
		type        : 'mobile-number-select',
		inputType   : 'number',
		placeholder : 'Mobile Number*',
		span        : 12,
		rules       : { required: true },
		value       : {
			country_code : geo.country.mobile_country_code,
			number       : '',
		},
	},
];

const useMobileNoVerification = () => {
	const {
		profile: {
			id: userId = '',
			mobile_country_code: mobileCountryCode = '',
			mobile_number: mobileNumber = '',
		},
	} = useSelector((state) => state);

	const [errors, setErrors] = useState({});
	const [showEnterOtpComponent, setShowEnterOtpComponent] = useState(false);
	const [otpNumber, setOtpNumber] = useState('');

	const apiName = 'verify_user_mobile';
	const verifyMobileNumberApi = useRequest({
		url    : `/${apiName}`,
		method : 'post',
	}, { manual: true });
	const controls = getControls();

	const newControls = useMemo(() => controls?.map((control) => {
		if (control?.name === 'mobileNumber') {
			return {
				...control,
				value: {
					country_code:
							mobileCountryCode
							// || defaultCountry?.mobile_country_code
							|| control?.value?.country_code
							|| '+91',
					number: mobileNumber || control?.value?.number || '',
				},
			};
		}

		return { ...control };
	}), [controls, mobileCountryCode, mobileNumber]);

	const formProps = useForm(newControls);

	const watchMobileNumberControl = formProps.watch('mobileNumber');

	useEffect(() => {
		if (showEnterOtpComponent) setShowEnterOtpComponent(false);
	}, [watchMobileNumberControl]);

	const verifyMobileNumber = async ({ actionType = {}, ...restProps }) => {
		try {
			const values = formProps.getValues();

			let payload = {
				id                  : userId,
				mobile_country_code : values?.mobileNumber?.country_code,
				mobile_number       : values?.mobileNumber?.number,
			};
			if (actionType === 'VERIFY_OTP') {
				payload = { ...payload, mobile_otp: otpNumber };
			}

			const response = await verifyMobileNumberApi?.trigger({ data: payload });

			if (response?.hasError) return;

			if (actionType === 'SEND_OTP') {
				setShowEnterOtpComponent(true);

				Toast.success(
					'OTP resent successfully',
				);

				restProps?.timer?.restart?.();
			}

			if (actionType === 'VERIFY_OTP') {
				Toast.success(
					'Mobile number verified successfully',
				);

				window.location.reload();
			}
		} catch (error) {
			showErrorsInToast(error?.data);
		}
	};

	const onErrors = (errs = {}) => setErrors({ ...errs });

	const sendOtpNumber = ({ timer = {} }) => verifyMobileNumber({ actionType: 'SEND_OTP', timer });
	const onSubmit = () => sendOtpNumber({});

	const verifyOtpNumber = () => verifyMobileNumber({ actionType: 'VERIFY_OTP' });

	return {
		controls: newControls,
		formProps,
		errors,
		onSubmit,
		onErrors,
		showEnterOtpComponent,
		otpNumber,
		setOtpNumber,
		verifyMobileNumberApi,
		sendOtpNumber,
		verifyOtpNumber,
	};
};

export default useMobileNoVerification;
