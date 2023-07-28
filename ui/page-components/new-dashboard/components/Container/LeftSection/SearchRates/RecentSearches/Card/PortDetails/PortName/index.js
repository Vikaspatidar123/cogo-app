import { Tooltip, cl } from '@cogoport/components';

import styles from '../styles.module.css';

const START_INDEX = 0;
const END_INDEX = 15;
const NEGATIVE_INDEX = 1;
function PortName({ location }) {
	const splitDisplayName = (location.display_name || '').split(',');
	const displayNameLength = splitDisplayName?.length;

	const countryName = (location?.country || {}).name || splitDisplayName[displayNameLength - NEGATIVE_INDEX] || '';
	const locationName = `${location?.port_code || ''}, ${countryName}`;

	return (
		<div className={styles.port_info}>
			<div className={cl`${styles.text} ${styles.info}`}>{locationName || ''}</div>
			<Tooltip
				content={<div style={{ color: 'grey' }}>{location?.name}</div>}
			>
				<div className={cl`${styles.text} ${styles.name}`}>
					{location?.name?.substring(START_INDEX, END_INDEX)
				|| ''}

				</div>
			</Tooltip>
		</div>
	);
}
export default PortName;
