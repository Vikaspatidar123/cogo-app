import { Toast } from '@cogoport/components';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const useSubmitFundingRequestDetails = ({
	setOpenFundingRequest,
	creditRequest,
	refetchList,
}) => {
	const organization_id = creditRequest?.organization_id;

	const [{ data, loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : 'update_ef_shipment_request',
		},
		{ manual: true },
	);

	const [{ data: buyersData }, getBuyerDetailsApi] = useRequest(
		{
			method : 'get',
			url    : 'list_export_factoring_buyers',
		},
		{ manual: true },
	);

	const getBuyerDetails = async () => {
		try {
			await getBuyerDetailsApi({
				params: { organization_id: '3d7c2e98-14e2-4a05-8104-a133eddc8eb6' },
			});
			return true;
		} catch (error) {
			return false;
		}
	};

	const onSubmit = async (values) => {
		try {
			const invoice_params = values?.addInvoice?.map((x) => ({
				invoice_number : x?.invoice_no,
				currency       : x?.credit_limit?.currency,
				invoice_amount : x?.credit_limit?.price,
			}));

			const payload = {
				// shipment_serial_id       : values?.sid,
				shipment_serial_id       : 150435,
				buyer_id                 : values?.buyer_name,
				exporter_bank_account_id : values?.exporter_bank_account_id,
				invoice_params,
			};

			await trigger({
				data: { ...payload },
			});
			setOpenFundingRequest(false);
			Toast.success('Successfully submitted');
			refetchList();
		} catch (err) {
			Toast.error(err.data);
		}
	};

	return {
		getBuyerDetails,
		buyersData,
		onSubmit,
		loading,
	};
};

export default useSubmitFundingRequestDetails;
