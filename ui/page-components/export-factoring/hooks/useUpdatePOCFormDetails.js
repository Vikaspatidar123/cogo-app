import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useUpdatePOCFormDetails = ({ refetch = () => { }, id = '' }) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_credit_poc_details',
		},
		{ manual: true },
	);

	const updatePOCDetails = async ({
		pocDetails = {},
	}) => {
		const details = pocDetails?.user;
		const {
			name = '', email = '',
			mobile_number = '',
			id:organization_user_id = '',
			mobile_country_code = '',

		} = details || {};

		try {
			await trigger({
				data: {
					credit_id                           : id,
					export_factoring_service_attributes : {
						poc_details: {
							name,
							email,
							mobile_number       : mobile_number?.number || mobile_number,
							mobile_country_code : mobile_number?.country_code || mobile_country_code,
							work_scope          : pocDetails?.designation?.value,
							organization_user_id,
						},
					},

				},
			});
			refetch();
		} catch (e) {
			Toast.error('Please try selecting or adding another POC');
		}
	};

	return { updatePOCDetails, loading, data };
};

export default useUpdatePOCFormDetails;
