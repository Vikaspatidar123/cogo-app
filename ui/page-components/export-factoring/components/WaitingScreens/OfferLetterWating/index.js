import { IcAFinancial, IcAProfessionalQuotations, IcATradeFinance } from '@cogoport/icons-react';
import React from 'react';

import FilePreview from '../../../common/FilePreview';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function OfferLetterWaiting({ getCreditRequestResponse = {} }) {
	const { documents = {}, status = '' } = getCreditRequestResponse || {};
	const { offer_letter = {} } = documents;
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.doc_icon}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.ef_waiting_screen_image}
						alt="document-offer-letter-waiting"
						width={150}
						height={100}
					/>
				</div>
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
					<div className={styles.card_icon}>
						<IcAProfessionalQuotations width="25px" height="25px" />
					</div>
					<div className={styles.card_label}>
						Upto 90% of Invoice
					</div>
					<div className={styles.card_sub_label}>
						Get best in class value on your invoices with upto 90% of your invoice
					</div>
				</div>
				<div className={styles.card}>
					<div className={styles.card_icon}>
						<IcAFinancial width="30px" height="30px" />
					</div>
					<div className={styles.card_label}>
						Upto $500K Limit
					</div>
					<div className={styles.card_sub_label}>
						Get Collateral free sanctioned limit upto $500K
					</div>
				</div>
				<div className={styles.card}>
					<div className={styles.card_icon}>
						<IcATradeFinance width="30px" height="30px" />
					</div>
					<div className={styles.card_label}>
						Avoid New Debt
					</div>
					<div className={styles.card_sub_label}>
						Cogofin does not create a debt on your accounts
					</div>
				</div>
			</div>
			{status === 'locked' && offer_letter.active && (
				<div className={styles.view_container}>
					<p>Locked Offer Letter</p>
					<FilePreview name="Offer Letter" url={offer_letter.active.document_url} />
				</div>
			)}
			<div className={styles.footer}>
				Incase of any query regarding your application, please reach out to us on ef.ops@cogoport.com
			</div>
		</div>
	);
}

export default OfferLetterWaiting;
