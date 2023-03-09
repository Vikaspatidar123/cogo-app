import Quotationdetails from './QuotationDetails';
import styles from './styles.module.css';

function Section1({ viewQuoteData = {} }) {
	const k = viewQuoteData.buyerDetails;

	return (
		<div className={styles.section1_data}>
			<div className={styles.to_address}>
				<h2> To: </h2>
				<h1 className={styles.bill}>{k?.billingPartyName}</h1>
				<p>{k?.pocName}</p>
				<p>{k?.pincode}</p>
				<p>{k?.pocPhoneNumber}</p>
				<p>{k?.pocEmail}</p>
				<p>{k?.taxNumber}</p>
			</div>
			<div className={styles.Quote_details}>
				<Quotationdetails viewQuoteData={viewQuoteData} />
			</div>
		</div>
	);
}
export default Section1;
