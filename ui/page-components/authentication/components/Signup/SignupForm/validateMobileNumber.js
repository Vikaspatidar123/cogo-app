import { Toast } from '@cogoport/components';

import getApiErrorString from '@/packages/forms/utils/getApiError';

async function validateMobileNumber(props) {
	const { setCustomError, fetchLeadUserTrigger, payload, t } = props;

	try {
		await fetchLeadUserTrigger({
			data: payload,
		});

		setCustomError('');
		return true;
	} catch (error) {
		Toast.error(getApiErrorString(error?.response?.data) || t('authentication:signup_error_message'));

		setCustomError(t('authentication:signup_mobile_error'));

		return false;
	}
}

export default validateMobileNumber;
