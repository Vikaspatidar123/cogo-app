import { useTranslation } from 'next-i18next';

import getBankAccountControls from '../../utils/bankAccountControls';

import { useForm } from '@/packages/forms';
import { useRequest } from '@/packages/request';

const useBankAccount = ({
	filledDetails = {},
	setCurrentStep = () => {},
	setFilledDetails = () => {},
}) => {
	const { t } = useTranslation(['common']);

	const bankAccountControls =		getBankAccountControls({ values: filledDetails.bank_details, t }) || [];
	const bankAccountFormProps = useForm();

	const onSubmit = (values = {}) => {
		setFilledDetails((previousState) => ({
			...previousState,
			bank_details: values,
		}));

		setCurrentStep('documents');
	};

	const [{ loading }, trigger] = useRequest({
		url    : 'organization/get_bank_details',
		method : 'get',
	}, { manual: false });
	const { setValues } = bankAccountFormProps;

	const getBankDetails = async ({ ifsc_code }) => {
		try {
			const response = await trigger({
				params: {
					ifsc_code,
				},
			});
			const bankData = response?.data;

			if (bankData) {
				setValues({
					bank_name   : bankData?.bank || '',
					branch_name : bankData?.branch || '',
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const onBlurIfscControl = ({ code: ifsc_code }) => {
		getBankDetails({ ifsc_code });
	};

	return {
		onSubmit,
		bankAccountControls,
		onBlurIfscControl,
		bankDetailsLoading: loading,
		bankAccountFormProps,
		t,
	};
};

export default useBankAccount;
