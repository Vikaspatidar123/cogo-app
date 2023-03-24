// import React from 'react';

// import Header from './Header';
// import Item from './Item';
// import { Container } from './styles';
import Header from './Header';
import ItemHeader from './Item';
import styles from './styles.module.css';

function InvoiceItem({
	item = {},
	shipmentData = {},
	invoicingPartyWiseInfo = {},
	refetch = () => {},
}) {
	return (
		<div className={styles.container}>
			<Header
				item={item}
				invoicingPartyWiseInfo={invoicingPartyWiseInfo}
				shipmentData={shipmentData}
			>
				{(item?.invoices || []).map((invoice) => (
					<ItemHeader
						invoice={invoice}
						shipmentData={shipmentData}
						refetch={refetch}
					/>
				))}
			</Header>
		</div>
	);
}

export default InvoiceItem;
