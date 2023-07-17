import React from 'react';

import styles from './styles.module.css';

function TradeList({ list = [] }) {
	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div className={styles.label}>
					<span>Country Name</span>
				</div>
				<div className={styles.label}>
					<span>Products</span>
				</div>
			</div>

			{list.map((item) => (
				<div className={styles.item_container} key={item?.country?.name}>
					<div className={styles.row}>
						<div className={styles.col}>
							<span>{item?.country?.name}</span>
						</div>
						<div className={styles.col}>
							<span>{item?.products[0]}</span>
						</div>

					</div>

				</div>
			))}
		</div>
	);
}

export default TradeList;
