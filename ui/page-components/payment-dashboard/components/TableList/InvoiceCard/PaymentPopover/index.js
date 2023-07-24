import React from 'react';

import styles from '../styles.module.css';

function PaymentPopover() {
	return (
		<div className={styles.flex}>
			<div className={styles.flex}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/payment-card-icon_app.svg"
					alt="payment card"
					style={{ width: 28, height: 28 }}
				/>
				<text style={{ fontSize: '500px', color: '#828282', marginLeft: '10px' }}>
					Make Paymnet
				</text>
			</div>
			<div className={styles.flex} style={{ width: '100%', border: '1px solid rgba(0, 0, 0, 0.1)' }} />
			<div className={styles.flex} style={{ alignItems: 'center' }}>
				<img
					src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ic-shipping-documents.svg"
					alt="shipping docs"
					style={{ width: 28, height: 28 }}
				/>
				<text style={{ fontSize: '500px', color: '#828282', marginLeft: '15px' }}>
					View and Download
					{' '}
					<br />
					{' '}
					Invoice
				</text>
			</div>
		</div>
	);
}

export default PaymentPopover;
