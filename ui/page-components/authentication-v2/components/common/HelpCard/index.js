import { IcMCall, IcMEmail } from '@cogoport/icons-react';

import styles from './styles.module.css';

const PHONE_NUMBER = '+918976851674';
const EMAIL_ID = 'kanira.patel@cogoport.com';

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

				<a href={`mailto:${EMAIL_ID}`} className={styles.link_value}>
					{EMAIL_ID}
				</a>
			</div>

			<div className={styles.links}>
				<IcMCall style={{ marginRight: '8px' }} />

				Mobile Number:

				<a href={`tel:${PHONE_NUMBER}`} className={styles.link_value}>
					{PHONE_NUMBER}
				</a>
			</div>

		</div>
	);
}

export default HelpCard;
