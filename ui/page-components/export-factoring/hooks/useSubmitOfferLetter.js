import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useSubmitOfferLetter = () => {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_credit_application',
		},
		{ manual: true },
	);

	const onSubmit = async (credit_id) => {
		try {
			const response = await trigger({
				data: {
					credit_id,
					export_factoring_service_attributes: {
						section_to_update : 'offer_letter',
						offer_letter      : {
							is_offer_letter_complete: true,
						},
					},
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
		onSubmit,
		loading,
		data,
	};
};

export default useSubmitOfferLetter;
