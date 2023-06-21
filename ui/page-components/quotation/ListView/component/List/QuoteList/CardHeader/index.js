import { cl } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function CardHeader({ config, setGlobalFilter }) {
	return (
		<div className={cl`${styles.card_row} ${styles.header_item}`}>
			{config.map((cardHeader) => (
				<div
					key={cardHeader?.key}
					style={{ width: `${cardHeader?.width}` }}
					className={cl`${styles.col} ${styles.card_header_col}`}
				>
					{cardHeader.name}
					{cardHeader?.sorting && (
						<div
							className={styles.sorting_icon}
							role="presentation"
							style={{ transform: `${cardHeader?.sortVariable ? 'rotate(-180deg)' : 'rotate(0)'}` }}
							onClick={() => {
								cardHeader?.sortFn(!cardHeader?.sortVariable);
								setGlobalFilter((prev) => ({
									...prev,
									sortType : cardHeader?.sortVariable,
									sortBy   : cardHeader?.sortValue,
								}));
							}}
						>
							<IcMArrowDown />
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default CardHeader;
