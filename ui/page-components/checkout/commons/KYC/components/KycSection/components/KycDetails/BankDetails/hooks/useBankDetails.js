import { useEffect, useState } from 'react';

import { getControls } from '../utils/controls';

import useSaveBankDetails from './useSaveBankDetails';

import { useForm } from '@/packages/forms';

const useBankDetails = ({
	CONSTANTS = {},
	state = {},
	setState = () => {},
	setKycDetails = () => {},
}) => {
	const {
		COMPONENT_KEYS: { ACCOUNT_INFORMATION },
	} = CONSTANTS;

	const { [ACCOUNT_INFORMATION]: accountInformation = {} } = state;
	const { bankDetails = {} } = accountInformation;
	const { formValues: bankDetailsFormValues = {} } = bankDetails;

	const [isFormSaved, setIsFormSaved] = useState(() => {
		if (Object.keys(bankDetailsFormValues).length > 0) {
			return true;
		}

		return false;
	});

	const {
		loading: createBankDetailsApiLoading = false,
		saveBankDetails = () => {},
	} = useSaveBankDetails({
		action: Object.keys(bankDetailsFormValues).length > 0 ? 'edit' : 'create',
		CONSTANTS,
		state,
		setState,
		setIsFormSaved,
		setKycDetails,
	});

	const controls = getControls({
		values: bankDetailsFormValues,
		isFormSaved,
	});

	const {
		formProps = {},
		control,
	} = useForm();

	const { formState = {}, watch = () => {} } = formProps;

	useEffect(() => {
		const subscription = watch(() => setIsFormSaved(false));
		return () => subscription.unsubscribe();
	}, [watch]);

	const onSubmit = (values = {}) => {
		saveBankDetails({ values });
	};

	return {
		controls,
		control,
		formProps,
		errors: formState.errors,
		onSubmit,
		createBankDetailsApiLoading,
		isFormSaved,
	};
};

export default useBankDetails;
