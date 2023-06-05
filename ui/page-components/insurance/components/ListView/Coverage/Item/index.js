import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function Item({ location = {} }) {
	const { display_name = '', name = '' } = location || {};

	// const splitDisplayName = (location.display_name || '').split(',');

	// const info =		(location.country || {}).name
	// 	|| splitDisplayName[(splitDisplayName || []).length - 1]
	// 	|| '';

	return (
		<div className={styles.container}>
			{display_name.length > 5 ?	(
				<Tooltip content={display_name} theme="light">
					<div className={styles.info}>{display_name}</div>
				</Tooltip>
			) : <div className={styles.text}>{display_name}</div>}
			<div className={styles.code_div}>
				{name.length > 3	? 	(
					<Tooltip
						content={name}
						theme="light"
					>
						<div className={styles.code}>{name || ''}</div>
					</Tooltip>
				) : <div className={styles.code_val}>{name || ''}</div> }
			</div>
		</div>
	);
}

export default Item;
