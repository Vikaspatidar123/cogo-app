import { useEffect, useMemo, useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { toast } from '@cogoport/front/components/admin';
import { getApiErrorString } from '@cogoport/front/utils';
import { useRequest } from '@cogo/commons/hooks';

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

const useMobileNoVerification = ({
	channelPartnerDetails = {},
	selectedUser = {},
	type = '',
}) => {
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
							selectedUser.mobile_country_code ||
							control?.value?.country_code ||
							'+91',
						number: selectedUser.mobile_number || control?.value?.number || '',
					},
				};
			}

			return { ...control };
		});
	}, [controls, selectedUser]);

	const formProps = useFormCogo(newControls);

	const watchMobileNumberControl = formProps.watch('mobileNumber');

	useEffect(() => {
		if (showEnterOtpComponent) setShowEnterOtpComponent(false);
	}, [watchMobileNumberControl]);

	const onSubmit = () => sendOtpNumber({});

	const onErrors = (errs = {}) => setErrors({ ...errs });

	const sendOtpNumber = ({ timer = {} }) =>
		verifyMobileNumber({ actionType: 'SEND_OTP', timer });

	const verifyOtpNumber = () =>
		verifyMobileNumber({ actionType: 'VERIFY_OTP' });

	const verifyMobileNumber = async ({ actionType = {}, ...restProps }) => {
		try {
			const values = formProps.getValues();

			let payload = {
				partner_id: channelPartnerDetails.id,
				user_id: selectedUser.user_id,
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
