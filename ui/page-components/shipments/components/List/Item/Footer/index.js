import { IcMArrowRight } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import IconElement from './IconElement';
import servicesSort from './services.json';
import styles from './styles.module.css';

import iconsJson from '@/ui/page-components/product-catalouge/configurations/icons';

function Footer({ data, viewAs, isBookingDesk = false }) {
	const services =		viewAs === 'importer_exporter' ? data.services || [] : [data.service_type];

	if (services.length < 1) {
		return null;
	}

	if (services.length > 1) {
		services.sort((a, b) => servicesSort.indexOf(a) - servicesSort.indexOf(b));
	}

	if (services.length < 1) {
		return null;
	}

	const isCancelled = data?.state === 'cancelled' || data?.state === 'aborted';

	const info = [
		{
			value : !isCancelled ? data?.free_days_detention_destination : null,
			label : 'destination detention days',
		},
		{
			value : !isCancelled ? data?.free_days_detention_origin : null,
			label : 'origin detention days',
		},
		{
			value      : startCase(data?.cancellation_reason || ''),
			labelFront : 'Reason:',
			className  : 'red',
		},
		{
			value      : startCase(data?.cancellation_subreason || ''),
			labelFront : 'Subreason:',
			className  : 'red',
		},
	];

	return isBookingDesk ? (
		<div>agents</div>//
	) : (
		<div className={styles.top_container}>
			<ul className={styles.list}>
				{services.map((item, idx) => (
					<li key={item}>
						{idx !== 0 && (
							<IcMArrowRight />
						)}
						<div className={styles.icon_container}>
							<IconElement {...iconsJson[item]?.new} />
						</div>
					</li>
				))}
			</ul>
			<div className={styles.item}>
				{info.map((item) => (item.value ? (
					<div className={styles.inner_item}>
						<span className={`${styles.dot} ${styles.item?.className || ''}`} />
						<span className={`${styles.label} ${styles.item?.className || ''}`}>
							{`${item.labelFront || ''} ${item.value} ${item.label || ''}`}
						</span>
					</div>
				) : null))}
			</div>
		</div>
	);
}

export default Footer;
