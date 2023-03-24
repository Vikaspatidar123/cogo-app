// import React from 'react';

// import InvoiceItem from './InvoiceItem';
// import { Container } from './styles';
import styles from './styles.module.css';

function Invoice({
	shipmentData = {},
	invoiceData = {},
	groupedInvoices = {},
	refetch = () => {},
}) {
	const totals = invoiceData?.invoicing_party_wise_total;

	return (
		<div className={styles.container}>
			{Object.keys(groupedInvoices || {}).map((item) => (
				<InvoiceItem
					item={groupedInvoices[item]}
					shipmentData={shipmentData}
					invoicingPartyWiseInfo={totals?.[item]}
					refetch={refetch}
				/>
			))}
		</div>
	);
}

export default Invoice;
