import { Tooltip, cl } from '@cogoport/components';

import styles from '../styles.module.css';

function PortName({ location }) {
	const splitDisplayName = (location.display_name || '').split(',');
	const displayNameLength = splitDisplayName?.length;

	const info1 = (location.country || {}).name || splitDisplayName[displayNameLength - 1] || '';
	const info2 = `${location.port_code}, ${info1}`;

	return (
		<div className={styles.port_info}>
			<div className={cl`${styles.text} ${styles.info}`}>{info2}</div>
			<Tooltip
				content={<div style={{ color: 'grey' }}>{location.name}</div>}
			>
				<div className={cl`${styles.text} ${styles.name}`}>{location.name.substring(0, 15) || ''}</div>
			</Tooltip>
		</div>
	);
}
export default PortName;
