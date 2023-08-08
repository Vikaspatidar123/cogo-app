import styles from './styles.module.css';

function Header({ sellerDetails = {} }) {
	const {
		billingPartyName = '',
	} = sellerDetails;
	return (
		<div>
			<div className={styles.seller}>
				<h1 className={styles.name}>{billingPartyName}</h1>
			</div>
			<div className={styles.container}>
				<h2 className={styles.title}>Quotation</h2>
			</div>
		</div>
	);
}

export default Header;
