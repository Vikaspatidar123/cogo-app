import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ShippingLineComp({
	show = false,
	showLogo = false,
	data = {},
	className = '',
}) {
	return (
		<div
			className={cl`${show ? '' : styles.not_show} ${styles[className] || ''} ${styles.logo_container}`}
		>
			{showLogo ? (
				<img
					src={showLogo}
					alt={data?.shipping_line?.short_name || data?.airline?.short_name}
					style={{ height: '24px' }}
				/>
			) : null}
			{data?.source === 'cogo_assured_rate' ? (
				<div className={styles.shipping_line}>Cogoport Assured</div>
			) : (
				<div className={styles.shipping_line}>
					{data?.shipping_line?.short_name || data?.airline?.short_name}
				</div>
			)}
		</div>
	);
}

export default ShippingLineComp;
