import { IcMArrowRotateDown } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CardHeader({
	fields,
	sort = {},
	setSort,
}) {
	const handleOnchange = (item) => {
		setSort(() => {
			if (sort.sortBy !== item.key) {
				return {
					sortBy   : item.key,
					sortType : 'ASC',
				};
			}
			return {
				sortBy   : item.key,
				sortType : sort.sortType === 'DESC' ? 'ASC' : 'DESC',
			};
		});
	};

	return (
		<div className={styles.row}>
			{(fields || []).map((field) => (
				<div
					className={styles.display}
					key={field?.key || field?.label}
				>
					<div className={styles.card_title}>{field.label}</div>
					<div className={styles.rotate_icon}>
						{field.sorting && (
							<IcMArrowRotateDown
								className={sort.sortType === 'ASC' ? 'rotate' : 'no-rotate'}
								onClick={() => handleOnchange(field)}
							/>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default CardHeader;
