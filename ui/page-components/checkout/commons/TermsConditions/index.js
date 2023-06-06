import styles from './styles.module.css';
import TermsConditions from './TermsConditionsHelper';

import getDefaultTncConfig from '@/ui/commons/utils/getDefaultTncConfig';

function CheckoutTermsConditions({ summary, rate, source }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>Terms & Conditions</div>
			<div className={styles.main} style={source === 'checkout' ? { padding: 8 } : {}}>
				<TermsConditions
					terms={
						(rate.terms_and_conditions || []).length
							? rate.terms_and_conditions
							: getDefaultTncConfig(summary.primary_service)
					}
				/>
			</div>
		</div>
	);
}

export default CheckoutTermsConditions;
