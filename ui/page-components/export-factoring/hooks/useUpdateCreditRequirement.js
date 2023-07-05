import { useRequest } from '@/packages/request';

const useUpdateCreditRequirement = ({ getCreditRequestResponse = {}, refetch = () => {} }) => {
	const [{ data, loading }, trigger] = useRequest({
		method: 'post', url: '/update_credit_requirement_details',
	}, { manual: true, autoCancel: false });

	const updateCreditRequirement = async ({ values }) => {
		try {
			await trigger({
				data: {
					credit_id                    : getCreditRequestResponse?.id,
					customer_credit_requirements : {
						credit_amount          : values?.credit_amount,
						credit_amount_currency : values?.credit_amount_currency,
					},
					agent_credit_recommendations: {
						credit_amount          : values?.sales_credit_amount,
						credit_amount_currency : values?.sales_credit_amount_currency,
						credit_type            : 'limited_recourse',
					},
				},
			});
			refetch();
		} catch (e) {
			console.log(e);
		}
	};

	return { updateCreditRequirement, data, loading };
};

export default useUpdateCreditRequirement;
