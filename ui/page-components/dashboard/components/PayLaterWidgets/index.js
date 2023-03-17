import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function PayLaterWidgets() {
	return (
		<div className={styles.container}>
			<div className={styles.IconContainer}>
				<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/air.svg" alt="new" />
			</div>
			<div className={styles.Header}>
				Ship Now,
				{' '}
				<span className="blue">Pay Later </span>
				Easily apply online in just a few minutes
			</div>

			<div className={styles.InfoContainer}>
				<div className={styles.SvgContainer}>
					<img src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/docx.svg" alt="doc" />
				</div>
				<div className={styles.text} size={12}>
					Pay up to 90 days later for shipments, local transport, and other
					trade services without additional charges.
				</div>
			</div>

			<div className={styles.ButtonContainer}>
				<Button themeType="secondary">
					CHECK ELIGIBILITY NOW
				</Button>
			</div>
		</div>
	);
}

export default PayLaterWidgets;
