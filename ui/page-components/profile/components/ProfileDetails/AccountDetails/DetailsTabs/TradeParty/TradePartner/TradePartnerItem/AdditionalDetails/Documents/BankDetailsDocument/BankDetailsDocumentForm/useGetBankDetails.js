import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetBankDetails = ({ setValues }) => {
	const {
		general: { scope },
	} = useSelector((reduxState) => reduxState);

	const getBankAccount = useRequest(
		'get',
		false,
		scope,
	)('organization/get_bank_details');

	const getBankDetails = async ({ ifsc_code }) => {
		try {
			const response = await getBankAccount.trigger({
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
		onBlurIfscControl,
		bankDetailsLoading: getBankAccount.loading,
	};
};

export default useGetBankDetails;
