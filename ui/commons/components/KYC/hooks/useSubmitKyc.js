import { Toast } from '@cogoport/components';
import { useEffect } from 'react';

import getControls from '../components/PendingFromUser/IEKycSection/controls';

import { useForm } from '@/packages/forms';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import { getCountrySpecificData, getLocaleSpecificLabels } from '@/ui/commons/constants/CountrySpecificDetail';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const PAN_REGEX = GLOBAL_CONSTANTS.patterns.PAN_NUMBER;
const MAX_LENGTH = 10;

const useSubmitKyc = ({ onClose, organizationData = {} }) => {
	const { country_id, registration_number, preferred_languages } = organizationData || {};

	const controls = getControls();

	const [{ loading }, submitKycTrigger] = useRequest({
		method : 'post',
		url    : '/submit_organization_kyc',
	}, { manual: true });

	const formHook = useForm();
	const { setValue, watch } = formHook;

	const countryId = watch('country_id');

	const { validate_registration_number } = getCountrySpecificData({
		country_id   : countryId,
		accessorType : 'navigations',
		accessor     : 'common',
	});

	const IDENTIFICAITON_LABEL = getLocaleSpecificLabels({
		accessorType : 'identification_number',
		accessor     : 'label',
	});

	const newControls = controls.map((control) => {
		if (control.name === 'registration_number' && validate_registration_number) {
			return {
				...control,
				maxLength : MAX_LENGTH,
				rules     : {
					...control.rules,
					pattern: {
						value   : PAN_REGEX,
						message : `Please enter a valid ${IDENTIFICAITON_LABEL}`,
					},
				},
			};
		}
		return control;
	});

	const submitKyc = async ({ payload }) => {
		try {
			const res = await submitKycTrigger({ data: payload });

			if (!res.hasError) {
				Toast.success('Kyc submitted successfully!');
			}

			onClose();
		} catch (error) {
			console.error(error);
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	useEffect(() => {
		setValue('country_id', country_id);
		setValue('registration_number', registration_number);
		setValue('preferred_languages', preferred_languages);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [country_id, preferred_languages, registration_number]);

	return {
		submitKyc,
		loading,
		formHook,
		newControls,
	};
};

export default useSubmitKyc;
