import { useFormCogo } from '@cogoport/front/hooks';
import { getBankAccountControls } from '../../utils/controls';

const useBankAccount = ({
	filledDetails = {},
	setCurrentStep = () => {},
	setFilledDetails = () => {},
}) => {
	const bankAccountControls =
		getBankAccountControls({ values: filledDetails.bank_details }) || [];
	const bankAccountFormProps = useFormCogo(bankAccountControls);

	const onSubmit = (values = {}) => {
		setFilledDetails((previousState) => ({
			...previousState,
			bank_details: values,
		}));

		setCurrentStep('documents');
	};

	return {
		onSubmit,
		bankAccountControls,
		bankAccountFormProps,
	};
};

export default useBankAccount;
