import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';

const useLoginMobileAuthentication = ({
	setMode = () => {},
	setMobileNumber = () => {},
	setOtpId = () => {},
	mobileNumber = {},
}) => {
	const { t } = useTranslation(['common']);

	const [{ loading: otpLoading }, trigger] = useRequest(
		{
			url    : 'send_login_otp',
			method : 'post',
		},
		{ manual: true },
	);

	const onSendOtp = async (values, e) => {
		e.preventDefault();
		try {
			const response = await trigger({
				data: {
					mobile_number       : values?.mobile_number?.number,
					mobile_country_code : values?.mobile_number?.country_code,
				},
			});

			setOtpId(response?.data?.id);

			setMobileNumber(values?.mobile_number);

			setMode('otp_form');
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || t('common:loginOtp_failedOtp'),
			);
		}
	};

	const resendOtp = async ({ timer = {} }) => {
		try {
			const response = await trigger({
				data: {
					mobile_number       : mobileNumber?.number,
					mobile_country_code : mobileNumber?.country_code,
				},
			});

			setOtpId(response?.data?.id);

			Toast.success(t('common:loginOtp_resendOtp_success'));

			timer?.restart?.();
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || t('common:loginOtp_resendOtp_fail'),
			);
		}
	};

	return { onSendOtp, otpLoading, resendOtp };
};

export default useLoginMobileAuthentication;
