// import React from 'react';

// import InvoiceServiceWise from '../../../../SalesInvoice/Invoice/InvoiceItem/Item/InvoiceServiceWise';

// import Header from './Header';
// import { Container, InvoiceInfo } from './styles';
import styles from './styles.module.css';

function ItemHeader({
	invoice = {},
	shipmentData = {},
	refetch = () => {},
}) {
	return (
		<div className={styles.container}>
			<Header invoice={invoice} shipmentData={shipmentData} refetch={refetch}>
				<div className={styles.service_info}>
					{(invoice?.services || []).map((item) => (
						<InvoiceServiceWise item={item} key={item?.id} />
					))}
				</div>
			</Header>
		</div>
	);
}
export default ItemHeader;
