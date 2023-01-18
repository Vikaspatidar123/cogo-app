import { useEffect, useMemo, useState } from 'react';
import { useSelector } from '@cogoport/front/store';
import { useFormCogo } from '@cogoport/front/hooks';
import { toast } from '@cogoport/front/components/admin';
import { getApiErrorString } from '@cogoport/front/utils';
import useRequest from '@/temp/request/useRequest';

const controls = [
	{
		name: 'mobileNumber',
		label: 'Mobile Number',
		type: 'mobile-number-select',
		inputType: 'number',
		placeholder: 'Mobile Number*',
		span: 12,
		rules: { required: true },
	},
];

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

	const verifyMobileNumberAPI = useRequest(
		'post',
		false,
		'partner',
	)('/verify_channel_partner_user_mobile');

	const newControls = useMemo(() => {
		return controls?.map((control) => {
			if (control?.name === 'mobileNumber' && type === 'verify') {
				return {
					...control,
					value: {
						country_code:
							mobileCountryCode || control?.value?.country_code || '+91',
						number: mobileNumber || control?.value?.number || '',
					},
				};
			}

			return { ...control };
		});
	}, [controls, mobileCountryCode, mobileNumber]);

	const formProps = useFormCogo(newControls);

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

			await verifyMobileNumberAPI?.trigger({ data: payload });

			if (actionType === 'SEND_OTP') {
				setShowEnterOtpComponent(true);

				toast.success('OTP resent successfully');

				restProps?.timer?.restart?.();
			}

			if (actionType === 'VERIFY_OTP') {
				toast.success('Mobile number verified successfully');

				window.location.reload();
			}
		} catch (error) {
			toast.error(getApiErrorString(error.data));
		}
	};

	const sendOtpNumber = ({ timer = {} }) =>
		verifyMobileNumber({ actionType: 'SEND_OTP', timer });

	const verifyOtpNumber = () =>
		verifyMobileNumber({ actionType: 'VERIFY_OTP' });

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
		verifyMobileNumberAPI,
		sendOtpNumber,
		verifyOtpNumber,
	};
};

export default useMobileNoVerification;
