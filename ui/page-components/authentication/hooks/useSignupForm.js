import { getCookie } from '@cogoport/utils';
import { useEffect } from 'react';

import { checkMobileInput } from '../utils/check-mobile-input';
import { getCountryDetailsByCountryCode } from '../utils/get-country-details';

const useSignupForm = ({
	setCustomError,
	trigger,
	errors,
	setValue,
	formValues,
	onLeadUserDetails,
	leadUserId,
	setUserDetails,
	signupAuthentication,
}) => {
	const checkMobileDetails = (val) => {
		const hasMobileValues = checkMobileInput(val);

		if (hasMobileValues) {
			setCustomError('');
		} else {
			setCustomError('Mobile Details are required.');
		}

		return hasMobileValues;
	};

	const makeApiCallForEmail = async () => {
		await trigger('email');
		const { email } = formValues;
		if (email && errors.email === undefined) {
			onLeadUserDetails({ leadUserId, formValues });
		}
	};

	const makeApiCallForMobile = () => {
		const hasMobileValues = checkMobileDetails(formValues);
		const { mobile_number } = formValues;
		if (hasMobileValues && mobile_number) {
			onLeadUserDetails({ leadUserId, formValues });
		}
	};

	const onSignupApiCall = (values, e) => {
		const hasMobileValues = checkMobileDetails(values);

		if (hasMobileValues) {
			setUserDetails({ ...formValues });
			signupAuthentication(values, e);
		}
	};

	useEffect(() => {
		const locationCountryCode = getCookie('location');
		const {
			mobile_country_code = '',
			id = '',
		} = getCountryDetailsByCountryCode({ country_code: locationCountryCode });
		setValue('mobile_number', { country_code: mobile_country_code });
		setValue('country_id', id);
	}, [setValue]);

	useEffect(() => {
		const hasMobileValues = checkMobileInput(formValues);

		if (hasMobileValues) {
			setCustomError('');
		}
	}, [formValues, setCustomError]);

	return {
		onSignupApiCall,
		makeApiCallForEmail,
		makeApiCallForMobile,
	};
};

export default useSignupForm;
