import styles from './styles.module.css';

const QUOTATION_INFO = {
	quotationNo   : 'Quotation No',
	quotationDate : 'Quotation Date',
	expiryDate    : 'Expiry Date',
};

function BuyerDetails(props) {
	const {
		buyerDetails = {},
	} = props;
	const {
		billingPartyName,
		taxNumber: buyerTaxNumber,
		address: buyerAddress,
		pincode: buyerPinCode,
		pocName: buyerName,
		pocPhoneCode: buyerPhCode,
		pocPhoneNumber: buyerPhNo,
		pocEmail: buyerEmail,
	} = buyerDetails || {};
	return (
		<div className={styles.container}>
			<div className={styles.details}>
				<h2 className={styles.title}>To:</h2>
				<h1 className={styles.name}>{billingPartyName}</h1>
				<p className={styles.text}>{buyerName}</p>
				<p className={styles.text}>{`${buyerAddress} - ${buyerPinCode}`}</p>
				<p className={styles.text}>{`${buyerPhCode} ${buyerPhNo}`}</p>
				<p className={styles.text}>{buyerEmail}</p>
				<p className={styles.text}>{buyerTaxNumber}</p>
			</div>

			<div className={styles.info}>
				{Object.keys(QUOTATION_INFO).map((info) => (
					<div key={info} className={styles.row}>
						<p>
							{QUOTATION_INFO[info]}
							:
						</p>
						{props?.[info]}
					</div>
				))}
			</div>
		</div>
	);
}

export default BuyerDetails;
