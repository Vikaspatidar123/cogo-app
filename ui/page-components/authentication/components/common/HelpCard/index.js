import { IcMCall, IcMEmail } from '@cogoport/icons-react';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const NAME = GLOBAL_CONSTANTS?.onboarding_specialist.name || '';
const PHONE_NUMBER = GLOBAL_CONSTANTS?.onboarding_specialist.phone_number || '';
const EMAIL_ID = GLOBAL_CONSTANTS?.onboarding_specialist.email_id || '';

function HelpCard() {
	return (
		<div className={styles.help_card}>

			<span>Need some personal assistance?</span>

			<hr className={styles.line} />

			<h4>{NAME}</h4>

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
