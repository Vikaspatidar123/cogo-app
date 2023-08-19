import React from 'react';

import styles from './styles.module.css';

function PriceBreakUp({ details }) {
	return (
		<div className={styles.price_break_up_container}>
			{details.map((detail, i) => (
				<div
					key={detail.name}
					className={i === 0 ? styles.price_title : styles.price_detail}
				>
					<span>{detail.name}</span>
					<span>
						{detail.currency}
						{' '}
						{detail.price}
					</span>
				</div>
			))}
		</div>
	);
}

export default PriceBreakUp;
