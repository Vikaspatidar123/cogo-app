import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useFetchFundingSummary = ({
	invoice,
	creditRequest,
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
					credit_export_factoring_id : creditRequest?.credit_export_factoring_id,
					invoice_id                 : invoice?.id,
				},
			});
		} catch (error) {
			console.error(error, 'err');
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
