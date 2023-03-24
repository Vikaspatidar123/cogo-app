// import { Container, Anchor } from './styles';
import styles from './styles.module.css';

function PredefinedTncAndPrivacyPolicy() {
	return (
		<div className={styles.container}>
			For more Info. regarding Terms And Conditions, Please refer our
			<a
				className={styles.anchor}
				href="https://www.cogoport.com/terms-and-conditions"
				target="_blank"
				rel="noreferrer"
			>
				Terms & Conditions
			</a>
			{' '}
			and
			<a
				className={styles.anchor}
				href="https://www.cogoport.com/privacy-policy"
				target="_blank"
				rel="noreferrer"
			>
				Privacy policy
			</a>
		</div>
	);
}

export default PredefinedTncAndPrivacyPolicy;
