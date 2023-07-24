import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import styles from '../styles.module.css';

function TaxInvoiceModal() {
	return (
		<div className={styles.flex} direction="column">
			<div className={styles.flex} style={{ justifyContent: 'space-between' }}>
				<div className={styles.flex}>
					<IcMArrowBack size={21} />
					<div className={styles.flex} style={{ marginLeft: '10px' }}>
						<text size={14} style={{ color: '#333333', fontWeight: '500px' }}>
							Tax Invoice
						</text>
						<text style={{ color: '#333333' }}>
							FCL Freight |Invoice ID
						</text>
					</div>
				</div>
				<div className={styles.flex}>
					<div
						className={styles.flex}
						style={{
							width           : '30px',
							height          : '30px',
							backgroundColor : '#D9EAFD',
							borderRadius    : '30px',
							justifyContent  : 'center',
							alignItems      : 'center',
							boxShadow       : '0px 2px 25px rgba(56, 59, 68, 0.1)',
						}}
					>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/payment-card-icon_app.svg"
							alt="payment card"
							style={{ width: 21, height: 21 }}
						/>
					</div>
					<div
						className={styles.flex}
						style={{
							width           : '30px',
							height          : '30px',
							backgroundColor : '#D9EAFD',
							borderRadius    : '30px',
							justifyContent  : 'center',
							alignItems      : 'center',
							boxShadow       : '0px 2px 25px rgba(56, 59, 68, 0.1)',
							marginLeft      : '10px',
						}}
					>
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ic-shipping-documents.svg"
							alt="shipping docs"
							style={{ width: 21, height: 21 }}
						/>
					</div>
				</div>
			</div>
			<div
				className={styles.flex}
				style={{
					width           : '100%',
					height          : '650px',
					backgroundColor : '#C4C4C4',
					borderRadius    : '4px',
					marginTop       : '10px',
				}}
			/>
		</div>
	);
}

export default TaxInvoiceModal;
