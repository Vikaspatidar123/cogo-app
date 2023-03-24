import { useEffect, useState } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { getControls } from '../utils/controls';
import useSaveBankDetails from './useSaveBankDetails';

// const MIN_UPLOAD_INVOICE = 5;

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
		// MIN_UPLOAD_INVOICE,
		values: bankDetailsFormValues,
		isFormSaved,
	});

	const formProps = useFormCogo(controls);
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
		formProps,
		errors: formState.errors,
		onSubmit,
		createBankDetailsApiLoading,
		isFormSaved,
	};
};

export default useBankDetails;
