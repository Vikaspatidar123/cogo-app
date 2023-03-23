import { Popover } from '@cogoport/components';

import styles from './styles.module.css';

const getInfo = (location) => {
	const splitDisplayName = (location?.display_name || '').split(',');

	let info =		location?.country?.name
		|| splitDisplayName[(splitDisplayName || []).length - 1]
		|| '';

	info = `(${location?.port_code || location?.postal_code || ''}) ${info}`;

	return info;
};

function RouteItem({ location }) {
	return (
		<div className={styles.container}>
			<div className={styles.code}>{getInfo(location)}</div>

			<Popover
				placement="bottom-start"
				theme="light"
				render={<div style={{ fontSize: '10px' }}>{location?.name}</div>}
			>
				<div>{location?.name}</div>
			</Popover>
		</div>
	);
}

export default RouteItem;
