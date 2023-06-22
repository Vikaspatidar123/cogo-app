import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { checkMobileInput } from '../utils/check-mobile-input';
import { getIdByMobileCountryCode } from '../utils/get-id-by-mobile-country-code';
import { getLocationData } from '../utils/get-location-data';

const useSignupForm = ({
	setCustomError,
	setCaptchaError,
	trigger,
	errors,
	setValue,
	formValues,
	mobileCodeValue,
	onLeadUserDetails,
	leadUserId,
	captchaResponse,
	setUserDetails,
	signupAuthentication,
}) => {
	const [locationData, setLocationData] = useState({});

	const checkMobileDetails = (val) => {
		const hasMobileValues = checkMobileInput(val);

		if (hasMobileValues) {
			setCustomError('');
		} else {
			setCustomError('Mobile Details are required.');
		}

		return hasMobileValues;
	};

	const checkCaptcha = (val) => {
		if (val) {
			setCaptchaError('');
			return true;
		}
		setCaptchaError('Please complete the reCAPTCHA verification.');
		return false;
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
		const hasCaptchaValue = checkCaptcha(captchaResponse);
		const hasMobileValues = checkMobileDetails(values);

		if (hasCaptchaValue && hasMobileValues) {
			setUserDetails({ ...formValues });
			signupAuthentication(values, e);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const data = await getLocationData();
			setLocationData(data);
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (!isEmpty(locationData)) {
			setValue(
				'mobile_number',
				{ country_code: locationData.mobile_country_code || '' },
			);
		}
	}, [locationData, setValue]);

	useEffect(() => {
		if (mobileCodeValue?.country_code) {
			const countryId = getIdByMobileCountryCode({
				mobile_country_code: mobileCodeValue.country_code,
			});
			setValue('country_id', countryId);
		}
	}, [setValue, mobileCodeValue?.country_code]);

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
