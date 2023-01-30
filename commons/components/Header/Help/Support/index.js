import { isEmpty } from '@cogoport/utils';
import Link from 'next/link';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function Support({ agent = {} }) {
	const {
		profile: { partner = {} },
		general: { query = {} },
	} = useSelector((state) => state);

	const { tnc_accepted } = partner;
	const { partner_id } = query;

	const default_agent = {
		name                  : 'Ayushi Mishra',
		email                 : 'support@cogoport.com',
		mobile_country_code   : '+91',
		mobile_number         : '8976761462',
		mobile_number_eformat : '918976761462',
	};

	const agentKey = isEmpty(agent) ? default_agent : agent;

	return (
		<div className={styles.container}>
			<div className={styles.title}>Need some personal assistance?</div>

			<div className={styles.section}>
				<div className={styles.name}>{agentKey.name}</div>
				<div className={styles.label}>
					{!isEmpty(agent) ? 'Key Relationship Manager' : 'Onboarding Expert'}
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.contact} href={`mailto:${agentKey.email}`}>{agentKey.email}</div>
			</div>
			<div className={styles.section}>
				<div
					className={styles.contact}
					href={`tel:${
						agentKey.mobile_number || agentKey.mobile_number_eformat
					}`}
				>
					{`${agentKey.mobile_country_code} ${agentKey.mobile_number}`}
				</div>
			</div>
			{tnc_accepted ? (
				<Link className={styles.link} href={`/${partner_id}/faqs`}>FAQs</Link>
			) : null}
		</div>
	);
}

export default Support;
