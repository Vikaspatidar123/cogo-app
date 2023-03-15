import { IcMArrowDown } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function CardHeader({
	fields, singleList, sort = {}, setSort,
}) {
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
		<div className={styles.row_container}>
			{fields.map((field) => (
				<div
					className={styles.col_container}
					key={field?.key || field?.label}
				>
					<div className={singleList === 'icon' ? styles.card_title : styles.card_title_icon}>
						{field.label}
					</div>
					{field.sorting && (
						<IcMArrowDown
							className={
								sort.sortBy === field?.sortingKey && sort.sortType === 'ASC'
									? styles.caret
									: styles.caret_rotate
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
