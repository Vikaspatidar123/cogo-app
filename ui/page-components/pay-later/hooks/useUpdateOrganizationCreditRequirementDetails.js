import { useRequest } from '@/packages/request';

const useUpdateOrganizationCreditRequirementDetails = ({ getCreditRequestResponse = {} }) => {
	const [{ data, loading }, trigger] = useRequest({
		method: 'post', url: '/update_organization_credit_requirement_details',
	}, { manual: true, autoCancel: false });

	const updateCreditRequirementDetails = async ({ values }) => {
		try {
			await trigger({
				data: {
					credit_request_id            : getCreditRequestResponse?.id,
					customer_credit_requirements : {
						credit_amount          : values?.payment_requirement,
						credit_amount_currency : 'INR',
						credit_days            : values?.payment_days,
					},
				},
			});
		} catch (e) {
			console.log(e);
		}
	};

	return { updateCreditRequirementDetails, data, loading };
};

export default useUpdateOrganizationCreditRequirementDetails;
