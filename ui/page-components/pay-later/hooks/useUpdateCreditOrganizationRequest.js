import { useRequest } from '@/packages/request';

const useUpdateCreditOrganizationRequest = ({
	getCreditRequestResponse = {},
	companyAddress = {},
	directors = [],
	refetch = () => {},
	updatedValues = {},
}) => {
	const { values = {} } = updatedValues || {};
	const [{ data, loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_organization_credit_request',
	}, { autoCancel: false });

	const updateRequest = async () => {
		try {
			await trigger({
				data: {
					credit_request_id : getCreditRequestResponse?.id,
					status            : 'locked',
					get_cogoscore     : true,
					address           : {
						...companyAddress,
						company_address : companyAddress?.address,
						...values,
						country         : 'India',
					},
					directors,
				},
			});
			refetch();
		} catch (e) {
			console.log(e);
		}
	};

	return { updateRequest, data, loading };
};

export default useUpdateCreditOrganizationRequest;
