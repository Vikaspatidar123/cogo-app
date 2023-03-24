import { isEmpty } from '@cogoport/utils';
import { useEffect, useContext } from 'react';

import { ShipmentDetailContext } from '../common/Context';

import { useRequest } from '@/packages/request';

const groupByRegistrationNum = (invoices) => {
	const groupByOrgInvoices = {};
	(invoices || []).forEach((invoice) => {
		const key = invoice.billing_address?.registration_number;
		groupByOrgInvoices[key] = {
			invoices      : [...(groupByOrgInvoices[key]?.invoices || []), invoice],
			business_name : invoice?.billing_address?.business_name,
			name          : invoice?.billing_address?.name,
		};
	});
	return groupByOrgInvoices;
};

const useGetInvoicingPartyData = () => {
	// const { scope } = useSelector(({ general }) => ({ scope: general.scope }));

	const [contextValues] = useContext(ShipmentDetailContext);
	const { shipment_data } = contextValues || {};
	const [{ loading: invoiceLoading, data:invoiceData }, trigger] = useRequest({
		url    : 'get_shipment_invoice_preference',
		method : 'get',
	}, { manual: true });

	const getData = async () => {
		await trigger({
			params: {
				shipment_id         : shipment_data?.id || undefined,
				performed_by_org_id : shipment_data?.importer_exporter_id || undefined,
			},
		});
	};

	const groupedInvoices = groupByRegistrationNum(
		invoiceData?.invoicing_parties || [],
	);

	useEffect(() => {
		if (!isEmpty(shipment_data) && shipment_data?.importer_exporter_id) {
			getData();
		}
	}, [JSON.stringify(shipment_data)]);

	return {
		invoiceLoading,
		invoiceData,
		groupedInvoices,
		refetch: getData,
	};
};

export default useGetInvoicingPartyData;
