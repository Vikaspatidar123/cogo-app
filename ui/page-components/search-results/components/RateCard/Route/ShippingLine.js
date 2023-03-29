import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ShippingLineComp({
	show = false,
	showLogo = false,
	data = {},
	className = '',
	isMobile,
}) {
	return (
		<Tooltip
			className={`${show ? '' : 'not-show'} ${className || ''} ${
				isMobile ? 'mobile' : 'web'
			}`}
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
		</Tooltip>
	);
}

export default ShippingLineComp;
