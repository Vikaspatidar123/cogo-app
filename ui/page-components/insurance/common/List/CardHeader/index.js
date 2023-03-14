import { IcMArrowDown } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CardHeader({ fields, sort = {}, setSort }) {
	const Mapping = (item) => {
		const mapping = {
			transitDate : 'TRANSIT_START_DATE',
			createdAt   : 'CREATED_AT',
		};
		return mapping[item.key] ? mapping[item.key] : item.key;
	};
	const handleOnchange = (item) => {
		setSort(() => {
			if (sort.sortBy !== Mapping(item)) {
				return {
					sortBy   : Mapping(item),
					sortType : 'ASC',
				};
			}
			return {
				sortBy   : Mapping(item),
				sortType : sort.sortType === 'DESC' ? 'ASC' : 'DESC',
			};
		});
	};

	return (
		<div className={styles.row}>
			{fields.map((field) => (
				<div
					className={styles.col}
					key={field?.key || field?.label}
				>
					<div className={styles.card_title}>{field.label}</div>
					{field.sorting && (
						<IcMArrowDown
							className={
								sort.sortBy === field?.sortingKey && sort.sortType === 'ASC'
									? styles.rotate
									: styles.caret
							}
							onClick={() => handleOnchange(field)}
						/>
					)}
				</div>
			))}
		</div>
	);
}

export default CardHeader;
