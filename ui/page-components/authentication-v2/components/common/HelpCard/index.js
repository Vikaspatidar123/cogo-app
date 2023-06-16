import { IcMCall, IcMEmail } from '@cogoport/icons-react';

import styles from './styles.module.css';

function HelpCard() {
	return (
		<div className={styles.help_card}>

			<span>Need some personal assistance?</span>

			<hr className={styles.line} />

			<h4>Kanira Patel</h4>

			<span className={styles.designation}>Onboarding Specialist</span>

			<div className={styles.links}>
				<IcMEmail style={{ marginRight: '8px' }} />

				Email:

				<a href="mailto:kanira.patel@cogoport.com" className={styles.link_value}>
					kanira.patel@cogoport.com
				</a>
			</div>

			<div className={styles.links}>
				<IcMCall style={{ marginRight: '8px' }} />

				Mobile Number:

				<a href="tel:+918976851674" className={styles.link_value}>
					+91 8976851674
				</a>
			</div>

		</div>
	);
}

export default HelpCard;
