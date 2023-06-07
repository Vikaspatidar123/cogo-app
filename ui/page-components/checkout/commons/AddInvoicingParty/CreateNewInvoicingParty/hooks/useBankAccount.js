import { getBankAccountControls } from '../../utils/controls';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';

const useBankAccount = ({
	filledDetails = {},
	setCurrentStep = () => {},
	setFilledDetails = () => {},
}) => {
	const bankAccountControls =		getBankAccountControls({ values: filledDetails.bank_details }) || [];
	const { bankAccountFormProps, control } = useForm();

	const { setValues } = bankAccountFormProps;

	const onSubmit = (values = {}) => {
		setFilledDetails((previousState) => ({
			...previousState,
			bank_details: values,
		}));

		setCurrentStep('documents');
	};

	const [{ loading }, trigger] = useRequest({
		url    : 'get_bank_details',
		method : 'get',
	}, { manual: true });

	const getBankDetails = async ({ ifsc_code }) => {
		try {
			const response = await trigger({
				params: {
					ifsc_code,
				},
			});
			const bankData = response?.data || {};

			setValues({
				bank_name   : bankData.bank || '',
				branch_name : bankData.branch || '',
			});
		} catch (error) {
			console.log(error);
		}
	};

	const onBlurIfscControl = ({ code: ifsc_code }) => {
		getBankDetails({ ifsc_code });
	};

	return {
		onSubmit,
		onBlurIfscControl,
		bankDetailsLoading: loading,
		bankAccountControls,
		bankAccountFormProps,
		control,
	};
};

export default useBankAccount;
