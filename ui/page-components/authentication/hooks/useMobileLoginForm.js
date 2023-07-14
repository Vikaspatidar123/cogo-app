import { getCookie } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { checkMobileInput } from '../utils/check-mobile-input';
import { getCountryDetailsByCountryCode } from '../utils/get-country-details';

const useMobileLoginForm = ({ formValues = {}, onSendOtp = () => {}, setValue = () => {} }) => {
	const [customError, setCustomError] = useState('');

	const onOtpApiCall = (values, e) => {
		const hasValues = checkMobileInput(values);

		if (hasValues) {
			setCustomError('');
			onSendOtp(values, e);
		} else {
			setCustomError('Mobile Details are required.');
		}
	};

	useEffect(() => {
		const locationCountryCode = getCookie('location');
		const { mobile_country_code = '' } = getCountryDetailsByCountryCode({ country_code: locationCountryCode });
		setValue('mobile_number', { country_code: mobile_country_code });
	}, [setValue]);

	useEffect(() => {
		const hasValues = checkMobileInput(formValues);

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
