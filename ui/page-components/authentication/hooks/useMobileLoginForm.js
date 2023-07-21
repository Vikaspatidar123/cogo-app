import { getCookie } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { checkMobileInput } from '../utils/check-mobile-input';
import { getCountryDetailsByCountryCode } from '../utils/get-country-details';

const useMobileLoginForm = ({ formValues = {}, onSendOtp = () => {}, setValue = () => {}, t = () => {} }) => {
	const [customError, setCustomError] = useState('');

	const onOtpApiCall = (values, e) => {
		const hasValues = checkMobileInput({ mobNumberObj: values?.mobile_number });

		if (hasValues) {
			setCustomError('');
			onSendOtp(values, e);
		} else {
			setCustomError(t('common:loginField_mobile_error'));
		}
	};

	useEffect(() => {
		const locationCountryCode = getCookie('location');
		const { mobile_country_code = '' } = getCountryDetailsByCountryCode({ country_code: locationCountryCode });
		setValue('mobile_number', { country_code: mobile_country_code });
	}, [setValue]);

	useEffect(() => {
		const hasValues = checkMobileInput({ mobNumberObj: formValues?.mobile_number });

		if (hasValues) {
			setCustomError('');
		}
	}, [formValues]);

	return {
		customError,
		onOtpApiCall,
	};
};

export default useMobileLoginForm;
