// import ViewQuotation from '../..';

import styles from './styles.module.css';

function QuotationDetails({ viewQuoteData = {} }) {
	return (
		<div>
			<div className={styles.serial_no}>
				<p className={styles.details_font}>Quotation No: </p>
				{viewQuoteData.quotationNo}

			</div>
			<div className={styles.serial_no}>
				<p className={styles.details_font}>Quotation date:</p>
				{viewQuoteData.quotationDate}
			</div>
			<div className={styles.serial_no}>
				<p className={styles.details_font}>Expiry Date: </p>
				{viewQuoteData.expiryDate}
			</div>
		</div>

	);
}
export default QuotationDetails;
