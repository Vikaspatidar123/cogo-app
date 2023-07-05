import React from 'react';

import styles from './styles.module.css';

function OfferLetterWaiting() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.doc_icon} />
				<div className={styles.wrapper_div}>
					<div className={styles.label}>We have received your Export Factoring Application</div>
					<div className={styles.sub_label}>
						We recommend you to keep
						visiting this page to the updated status of your application
					</div>
				</div>
			</div>
			<div className={styles.main_content}>
				<div className={styles.card}>
					<div className={styles.card_icon} />
					<div className={styles.card_label}>
						Upto 90% of Invoice
					</div>
					<div className={styles.card_sub_label}>
						Get best in class value on your invoices with upto 90% of your invoice
					</div>
				</div>
				<div className={styles.card}>
					<div className={styles.card_icon} />
					<div className={styles.card_label}>
						Upto $500K Limit
					</div>
					<div className={styles.card_sub_label}>
						Get Collateral free sanctioned limit upto $500K
					</div>
				</div>
				<div className={styles.card}>
					<div className={styles.card_icon} />
					<div className={styles.card_label}>
						Avoid New Debt
					</div>
					<div className={styles.card_sub_label}>
						Cogofin does not create a debt on your accounts
					</div>
				</div>
			</div>
			<div className={styles.view_container} />
			<div className={styles.footer} />
		</div>
	);
}

export default OfferLetterWaiting;
