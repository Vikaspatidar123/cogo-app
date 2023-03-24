import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function LocationData({ locationData = {} }) {
	const { port_code: code, name, display_name: country } = locationData || {};
	return (
		<div className={styles.location}>
			<Tooltip content={country} theme="light-border">
				<div className={styles.name}>
					<div className={styles.port}>{name}</div>
					{' '}
					<div className={styles.code}>
						(
						{code}
						)
					</div>
				</div>
			</Tooltip>

			<div className={styles.country}>{(country || '').split(',')[2]}</div>
		</div>
	);
}
export default LocationData;
