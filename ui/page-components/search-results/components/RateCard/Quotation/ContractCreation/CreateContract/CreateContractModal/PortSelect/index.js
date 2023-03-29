import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase, upperCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function PortSelect({ portDetail = {} }) {
	const {
		origin_port = {},
		destination_port = {},
		container_type,
		container_size,
		commodity,
		origin_airport,
		destination_airport,
		volume,
		weight,
		inco_term,
		trade_type,
	} = portDetail || {};

	return (
		<div className={styles.card_row}>
			<div className={styles.card}>
				<div className={styles.top_section}>
					<div className={styles.port_name}>
						{origin_port?.display_name || origin_airport?.display_name || '-'}
					</div>
					<IcMPortArrow />
					<div className={styles.port_name}>
						{destination_port?.display_name
							|| destination_airport?.display_name
							|| '-'}
					</div>
				</div>
				<div className={styles.bottom_section}>
					{commodity && <div className={styles.tag}>{startCase(commodity)}</div>}
					{container_size && (
						<div className={styles.tag}>
							{container_size}
							{' '}
							{container_size.includes('HC') ? ' ' : 'FT'}
						</div>
					)}
					{container_type && <div className={styles.tag}>{startCase(container_type)}</div>}
					{volume && (
						<div className={styles.tag}>
							VOL:
							{volume}
							CBM
						</div>
					)}
					{weight && (
						<div className={styles.tag}>
							WT:
							{weight}
							KGS
						</div>
					)}
					{inco_term && <div className={styles.tag}>{upperCase(inco_term)}</div>}
					{trade_type && <div className={styles.tag}>{startCase(trade_type)}</div>}
				</div>
			</div>
		</div>
	);
}

export default PortSelect;
