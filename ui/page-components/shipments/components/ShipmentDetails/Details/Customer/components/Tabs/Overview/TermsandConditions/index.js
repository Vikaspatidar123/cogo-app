import styles from './styles.module.css';
import TncItem from './TncItem';

function TermsAndConditions({ shipment_data = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>Terms And Conditions</div>
			</div>

			<TncItem list={shipment_data?.terms_and_conditions} />
		</div>
	);
}

export default TermsAndConditions;
