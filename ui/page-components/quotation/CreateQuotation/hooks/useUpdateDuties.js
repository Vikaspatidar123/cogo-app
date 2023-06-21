import { useRequestBf } from '@/packages/request';

const useUpdateDuties = () => {
	const [{ loading }, trigger] = useRequestBf({
		method  : 'put',
		url     : '/saas/quote/update-duties',
		authKey : 'put_saas_quote_update_duties',
	}, { manual: true });

	const fetchUpdateDuties = async (totalDutiesAndTaxes, quotationId) => {
		try {
			await trigger({
				params: {
					taxAmount: totalDutiesAndTaxes,
					quotationId,
				},
			});
		} catch (error) {
			console.log(error?.message);
		}
	};

	return { fetchUpdateDuties, loading };
};

export default useUpdateDuties;
