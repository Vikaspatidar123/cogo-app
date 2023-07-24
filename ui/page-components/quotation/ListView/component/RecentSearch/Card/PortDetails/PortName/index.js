import { Tooltip, cl } from '@cogoport/components';

import styles from '../styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const MAX_NAME_LENGTH = 11;
const ZEROTH_INDEX = GLOBAL_CONSTANTS.zeroth_index;

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
				<div className={cl`${styles.text} ${styles.name}`}>
					{location.name?.substring(ZEROTH_INDEX, MAX_NAME_LENGTH) || ''}
				</div>
			</Tooltip>
		</div>
	);
}
export default PortName;
