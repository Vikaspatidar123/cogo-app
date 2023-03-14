import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function Item({ location = {} }) {
	const splitDisplayName = (location.display_name || '').split(',');

	const info =		(location.country || {}).name
		|| splitDisplayName[(splitDisplayName || []).length - 1]
		|| '';

	return (
		<div className={styles.container}>
			<Tooltip content={<div style={{ color: 'grey' }}>{info}</div>} theme="light">
				<div className={styles.info}>{info}</div>
			</Tooltip>
			<div className={styles.code_div}>
				<Tooltip
					content={<div style={{ color: 'grey' }}>{location.name || ''}</div>}
					theme="light"
				>
					<div className={styles.code}>{location.name || ''}</div>
				</Tooltip>
			</div>
		</div>
	);
}

export default Item;
