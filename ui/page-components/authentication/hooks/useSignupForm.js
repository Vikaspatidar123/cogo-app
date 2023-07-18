import { getCookie } from '@cogoport/utils';
import { useEffect } from 'react';

import { checkMobileInput } from '../utils/check-mobile-input';
import { getCountryDetailsByCountryCode } from '../utils/get-country-details';

const useSignupForm = ({
	setCustomError = () => {},
	trigger = () => {},
	setValue = () => {},
	formValues = {},
	onLeadUserDetails = () => {},
	leadUserId = '',
	setUserDetails = () => {},
	onSignupAuthentication = () => {},
	t = () => {},
}) => {
	const { name, email, mobile_number } = formValues;

	const hasMobileValues = checkMobileInput({ mobNumberObj: mobile_number });

	const generateSignUpLeadUser = ({ source = '' }) => {
		if (!source) {
			return;
		}

		if (source === 'email') {
			trigger('email');
		}

		if (source === 'mobile_number') {
			if (hasMobileValues) {
				setCustomError('');
			} else {
				setCustomError(t('authentication:signupField_mobile_error'));
			}
		}

		if (name && email && hasMobileValues) {
			onLeadUserDetails({ leadUserId, formValues });
		}
	};

	const onSignupApiCall = (values, e) => {
		if (hasMobileValues) {
			setUserDetails({ ...formValues });
			onSignupAuthentication(values, e);
			setCustomError('');
		} else {
			setCustomError(t('authentication:signupField_mobile_error'));
		}
	};

	useEffect(() => {
		const locationCountryCode = getCookie('location');
		const {
			mobile_country_code = '',
			id = '',
		} = getCountryDetailsByCountryCode({ country_code: locationCountryCode });

		if (!hasMobileValues) {
			setValue('mobile_number', { country_code: mobile_country_code });
			setValue('country_id', id);
		}
	}, [hasMobileValues, setValue]);

	useEffect(() => {
		if (hasMobileValues) {
			setCustomError('');
		}
	}, [hasMobileValues, setCustomError]);

	return {
		onSignupApiCall,
		generateSignUpLeadUser,
	};
};

export default useSignupForm;
