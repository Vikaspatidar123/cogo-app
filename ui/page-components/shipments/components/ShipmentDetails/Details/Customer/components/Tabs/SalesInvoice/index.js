import { Placeholder } from '@cogoport/components';
import { useContext } from 'react';

import { ShipmentDetailContext } from '../../../../../common/Context';
import useGetInvoicingPartyData from '../../../../../hooks/useGetInvoicingPartyData';

import Header from './Header';
import Invoice from './Invoice';
import styles from './styles.module.css';

function SalesInvoice() {
	const [contextValues] = useContext(ShipmentDetailContext);
	const { shipment_data } = contextValues || {};

	const { invoiceLoading, invoiceData, groupedInvoices, refetch } = useGetInvoicingPartyData();

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
