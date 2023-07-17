import { useCallback, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useFetchInvoiceDetails = ({ showCiDetails, creditRequest }) => {
	const [{ loading, data }, trigger] = useRequest(
		{
			method : 'get',
			url    : '/get_ef_invoice_details',
		},
		{
			manual     : true,
			autoCancel : false,
		},
	);

	const fetchInvoiceDetails = useCallback(async () => {
		try {
			await trigger({
				params: {
					invoice_id                 : showCiDetails.id,
					shipment_serial_id         : parseInt(showCiDetails.sid, 10),
					credit_export_factoring_id : creditRequest?.credit_export_factoring_id,
				},
			});
		} catch (error) {
			console.error(error, 'err');
		}
	}, [creditRequest, showCiDetails, trigger]);

	useEffect(() => {
		fetchInvoiceDetails();
	}, [fetchInvoiceDetails]);

	return {
		fetchInvoiceDetails,
		loading,
		data,
	};
};

export default useFetchInvoiceDetails;
