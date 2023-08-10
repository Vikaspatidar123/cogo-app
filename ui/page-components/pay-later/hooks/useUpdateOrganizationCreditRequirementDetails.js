import { useRequest } from '@/packages/request';

const useUpdateOrganizationCreditRequirementDetails = ({ getCreditRequestResponse = {}, refetch = () => {} }) => {
	const [{ data, loading }, trigger] = useRequest({
		method: 'post', url: '/update_organization_credit_requirement_details',
	}, { manual: true, autoCancel: false });

	const updateCreditRequirementDetails = async ({ values }) => {
		try {
			await trigger({
				data: {
					credit_request_id            : getCreditRequestResponse?.id,
					customer_credit_requirements : {
						credit_amount          : values?.credit_amount,
						credit_amount_currency : 'INR',
						credit_days            : values?.credit_days,
					},
				},
			});
			refetch();
		} catch (e) {
			console.error(e);
		}
	};

	return { updateCreditRequirementDetails, data, loading };
};

export default useUpdateOrganizationCreditRequirementDetails;
