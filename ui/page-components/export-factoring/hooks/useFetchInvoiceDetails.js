import { useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useFetchInvoiceDetails = ({ showCiDetails }) => {
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

	const fetchInvoiceDetails = async () => {
		try {
			await trigger({
				params: {
					invoice_id                 : showCiDetails.id,
					shipment_serial_id         : parseInt(showCiDetails.sid, 10),
					credit_export_factoring_id : '4bf91e88-b3eb-4ed9-ad2c-4a7d86a4f9b9',
					// creditRequest?.credit_export_factoring_id,
				},
			});
		} catch (error) {
			console.log(error, 'err');
		}
	};

	useEffect(() => {
		fetchInvoiceDetails();
	}, []);

	return {
		fetchInvoiceDetails,
		loading,
		data,
	};
};

export default useFetchInvoiceDetails;
