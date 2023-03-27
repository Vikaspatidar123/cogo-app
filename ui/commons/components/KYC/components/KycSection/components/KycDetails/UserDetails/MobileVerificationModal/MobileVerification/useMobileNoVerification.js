import { Toast } from '@cogoport/components';
import { useEffect, useMemo, useState } from 'react';

import { useForm } from '@/packages/forms';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const controls = [
	{
		name        : 'mobileNumber',
		label       : 'Mobile Number',
		type        : 'mobile-number-select',
		inputType   : 'number',
		placeholder : 'Mobile Number*',
		span        : 12,
		rules       : { required: true },
	},
];

const useMobileNoVerification = ({
	channelPartnerDetails = {},
	selectedUser = {},
	type = '',
}) => {
	const [errors, setErrors] = useState({});
	const [showEnterOtpComponent, setShowEnterOtpComponent] = useState(false);
	const [otpNumber, setOtpNumber] = useState('');

	const [{ loading }, verifyMobileNumberAPI] = useRequest({
		url    : '/verify_channel_partner_user_mobile',
		method : 'post',
	}, { manual: true });

	const newControls = useMemo(() => controls?.map((control) => {
		if (control?.name === 'mobileNumber' && type === 'verify') {
			return {
				...control,
				value: {
					country_code:
							selectedUser.mobile_country_code
							|| control?.value?.country_code
							|| '+91',
					number: selectedUser.mobile_number || control?.value?.number || '',
				},
			};
		}

		return { ...control };
	}), [selectedUser.mobile_country_code, selectedUser.mobile_number, type]);

	const { formProps = {}, control } = useForm();

	const verifyMobileNumber = async ({ actionType = {}, ...restProps }) => {
		try {
			const values = formProps.getValues();

			let payload = {
				partner_id          : channelPartnerDetails.id,
				user_id             : selectedUser.user_id,
				mobile_country_code : values?.mobileNumber?.country_code,
				mobile_number       : values?.mobileNumber?.number,
			};
			if (actionType === 'VERIFY_OTP') {
				payload = { ...payload, mobile_otp: otpNumber };
			}

			await verifyMobileNumberAPI?.trigger({ data: payload });

			if (actionType === 'SEND_OTP') {
				setShowEnterOtpComponent(true);

				Toast.success('OTP resent successfully');

				restProps?.timer?.restart?.();
			}

			if (actionType === 'VERIFY_OTP') {
				Toast.success('Mobile number verified successfully');

				window.location.reload();
			}
		} catch (error) {
			Toast.error(getApiErrorString(error.data));
		}
	};

	const watchMobileNumberControl = formProps.watch('mobileNumber');

	useEffect(() => {
		if (showEnterOtpComponent) setShowEnterOtpComponent(false);
	}, [showEnterOtpComponent, watchMobileNumberControl]);

	const onErrors = (errs = {}) => setErrors({ ...errs });

	const sendOtpNumber = ({ timer = {} }) => verifyMobileNumber({ actionType: 'SEND_OTP', timer });

	const verifyOtpNumber = () => verifyMobileNumber({ actionType: 'VERIFY_OTP' });

	const onSubmit = () => sendOtpNumber({});

	return {
		controls: newControls,
		formProps,
		control,
		errors,
		onSubmit,
		onErrors,
		showEnterOtpComponent,
		otpNumber,
		setOtpNumber,
		verifyMobileNumberAPI,
		sendOtpNumber,
		verifyOtpNumber,
		loading,
	};
};

export default useMobileNoVerification;
