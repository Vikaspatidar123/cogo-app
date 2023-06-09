import { IcMEmail, IcMCall, IcMProfile } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ContactDetails({ manager }) {
	const renderItem = (IconElement, value, hasBorder) => (
		<div className={`${styles.main} ${hasBorder ? 'border' : ''}`}>
			<IconElement style={{ height: 16, width: 16, marginRight: 8 }} />
			<div className={styles.contact}>{value}</div>
		</div>
	);
	return (
		<div className={styles.container}>
			{renderItem(IcMProfile, manager?.name)}
			<div>| </div>
			{renderItem(IcMEmail, manager?.email, true)}
			<div>| </div>
			{renderItem(
				IcMCall,
				`${manager?.mobile_country_code} - ${manager?.mobile_number}`,
				true,
			)}
		</div>
	);
}

export default ContactDetails;
