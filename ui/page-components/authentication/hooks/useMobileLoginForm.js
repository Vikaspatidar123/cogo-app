import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import { checkMobileInput } from '../utils/check-mobile-input';
import { getLocationData } from '../utils/get-location-data';

import getGeoConstants from '@/ui/commons/constants/geo';

const useMobileLoginForm = ({ formValues = {}, onSendOtp = () => {}, setValue = () => {} }) => {
	const geo = getGeoConstants();

	const [customError, setCustomError] = useState('');
	const [locationData, setLocationData] = useState({});

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
				{ country_code: locationData?.mobile_country_code || geo?.country?.mobile_country_code },
			);
		}
	}, [locationData, setValue, geo?.country?.mobile_country_code]);

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
