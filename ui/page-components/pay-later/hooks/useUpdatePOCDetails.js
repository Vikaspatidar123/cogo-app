import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useUpdatePOCDetails = ({ refetch = () => {}, id = '' }) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_organization_credit_request_poc_details',
		},
		{ manual: true },
	);

	const updatePOCDetails = async ({
		poc = '',
		pocDetails = {},
	}) => {
		const details = pocDetails?.[poc];
		try {
			await trigger({
				data: {
					poc_details: {
						name                : details?.name || details?.poc_name,
						email               : details?.email,
						mobile_number       : details?.mobile_number?.number || details?.mobile_number,
						mobile_country_code : details?.mobile_number?.country_code
						|| details?.mobile_country_code,
						work_scope: poc,
					},
					credit_request_id: id,
				},
			});
			refetch();
		} catch (e) {
			Toast.error('Please try selecting or adding another POC');
		}
	};

	return { updatePOCDetails, loading, data };
};

export default useUpdatePOCDetails;
