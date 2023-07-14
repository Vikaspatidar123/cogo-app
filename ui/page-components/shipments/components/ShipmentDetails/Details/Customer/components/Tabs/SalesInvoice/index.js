import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import { ShipmentDetailContext } from '../../../../../common/Context';
import useGetInvoicingPartyData from '../../../../../hooks/useGetInvoicingPartyData';
import useGetNominatedSellQuotation from '../../../../../hooks/useGetNominatedSellQuotation';

import Header from './Header';
import Invoice from './Invoice';
import NominatedQuotations from './NominatedQuotations';
import styles from './styles.module.css';

function SalesInvoice() {
	const [contextValues] = useContext(ShipmentDetailContext);
	const { shipment_data } = contextValues || {};

	const { invoiceLoading, invoiceData, groupedInvoices, refetch } = useGetInvoicingPartyData();

	const { data } = useGetNominatedSellQuotation({ shipmentId: shipment_data?.id });

	const isNominatedShipment = shipment_data?.tags?.includes('nomination');

	if (invoiceLoading) {
		return (
			[1, 2, 3].map(() => (
				<div className={styles.loader}>
					<Placeholder height="30px" width="200px" />
					<Placeholder height="30px" width="200px" />
					<Placeholder height="30px" width="200px" />
					<Placeholder height="30px" width="200px" />
				</div>
			))
		);
	}

	if (!invoiceLoading && invoiceData?.length === 0) {
		return (
			<div className={styles.empty_container}>
				No Data!
			</div>
		);
	}

	if (isNominatedShipment && isEmpty(invoiceData)) {
		return (
			<NominatedQuotations shipment_data={shipment_data} data={data?.data} />
		);
	}

	return (
		<div className={styles.container}>
			<Header shipmentData={shipment_data} invoiceData={invoiceData} />

			<Invoice
				shipmentData={shipment_data}
				invoiceData={invoiceData}
				groupedInvoices={groupedInvoices}
				refetch={refetch}
			/>
		</div>
	);
}

export default SalesInvoice;
