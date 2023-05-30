import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const SHOW_TAG_IN_SERVICES = ['fcl_freight', 'fcl_freight_local'];

function ShippingLineComp({
	show = false,
	showLogo = false,
	data = {},
	className = '',
}) {
	const { shipping_line = {}, service_type = '' } = data;
	const { is_nvocc = false } = shipping_line || {};

	return (
		<div
			className={cl`${show ? '' : styles.not_show} ${styles[className] || ''} ${styles.logo_container}`}
		>
			{data?.source === 'cogo_assured_rate' ? (
				<p className={styles.cogo_assured}>Cogo Assured</p>
			)
				: (
					<>
						{showLogo ? (
							<img
								src={showLogo}
								alt={data?.shipping_line?.short_name || data?.airline?.short_name}
								style={{ height: '24px' }}
							/>
						) : null}
						<div className={styles.shipping_line}>
							{data?.shipping_line?.short_name || data?.airline?.short_name}
						</div>
						{SHOW_TAG_IN_SERVICES.includes(service_type) ? (
							<div className={styles.is_nvocc}>
								<div className={styles.is_nvocc_text}>{is_nvocc ? 'NVOCC' : 'Main Line'}</div>
							</div>
						) : null}

					</>
				)}
		</div>
	);
}

export default ShippingLineComp;
