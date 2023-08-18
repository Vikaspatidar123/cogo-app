import { useRequest } from '@/packages/request';

const useUpdateCreditRequirement = ({ getCreditRequestResponse = {}, refetch = () => {} }) => {
	const [{ data, loading }, trigger] = useRequest({
		method: 'post', url: '/update_credit_requirement_details',
	}, { manual: true, autoCancel: false });

	const updateCreditRequirement = async ({ values }) => {
		try {
			const customer_credit_requirements = values?.credit_amount > 0 ? {
				credit_amount          : values?.credit_amount.toString(),
				credit_amount_currency : values?.credit_amount_currency,
			} : {};
			await trigger({
				data: {
					credit_id: getCreditRequestResponse?.id,
					customer_credit_requirements,

				},
			});
			refetch();
		} catch (e) {
			console.error(e);
		}
	};

	return { updateCreditRequirement, data, loading };
};

export default useUpdateCreditRequirement;
