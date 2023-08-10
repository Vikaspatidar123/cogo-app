import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSubmitAgreement = () => {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'submit_credit_for_agreement_flow',
		},
		{ manual: true },
	);

	const submit = async (credit_id, tab_type) => {
		try {
			const response = await trigger({
				data: {
					credit_id,
					tab_type,
				},
			});
			if (response) {
				return true;
			}
			return false;
		} catch (err) {
			Toast.error(err);
			return false;
		}
	};

	return {
		submit,
		loading,
		data,
	};
};

export default useSubmitAgreement;
