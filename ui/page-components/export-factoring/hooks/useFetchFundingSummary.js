import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useFetchFundingSummary = ({
	invoice,
}) => {
	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'get',
			url    : '/get_ef_invoice_funding_summary',
		},
		{
			manual     : true,
			autoCancel : false,
		},
	);

	const fetchInvoiceList = async () => {
		try {
			await trigger({
				params: {
					credit_export_factoring_id : '4bf91e88-b3eb-4ed9-ad2c-4a7d86a4f9b9',
					invoice_id                 : invoice?.id,
					// creditRequest?.credit_export_factoring_id,
				},
			});
		} catch (error) {
			console.log(error, 'err');
		}
	};

	useEffect(() => {
		fetchInvoiceList();
	}, []);

	return {
		loading,
		data,
	};
};

export default useFetchFundingSummary;
