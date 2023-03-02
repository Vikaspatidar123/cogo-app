import { cl } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function CardHeader({ config }) {
	return (
		<div className={styles.card_row}>
			{config.map((cardHeader) => (
				<div
					key={cardHeader?.key}
					style={{ width: `${cardHeader?.width}` }}
					className={cl`${styles.col} ${styles.card_header_col}`}
				>
					{cardHeader.name}
					{cardHeader?.sorting && (
						<span className={styles.sorting_icon}>
							<IcMArrowDown />
						</span>
					)}
				</div>
			))}
		</div>
	);
}

export default CardHeader;
