import { IcMArrowLeft } from '@cogoport/icons-react';
import React from 'react';

import RouteCard from './RouteCard';
import styles from './styles.module.css';

import { iconMappings } from '@/ui/commons/configurations/color-options';

function RouteInfo({ handleDetailsView, lineString, handleShow }) {
	const wayPts = lineString.flatMap((line) => line.waypoints);

	const line_items = wayPts.flatMap((wayPt) => {
		const {
			display_name = '',
			location_id = '',
			type = '',
			services = {},
			is_icd = false,
		} = wayPt;

		const { prev = [], next = [] } = services;

		const newType = is_icd ? 'icd' : type;

		return [...prev, {
			type,
			value : display_name,
			location_id,
			icon  : iconMappings[newType],
		}, ...next];
	});

	return (
		<div className={styles.details_view}>
			<button className={styles.back_btn} onClick={() => handleDetailsView(false)}>
				<IcMArrowLeft />
				{' '}
				Back
			</button>
			<div className={styles.route_info}>
				{line_items.map(({ value, icon, location_id: locationId, type }, i) => {
					const isLast = (i === line_items.length - 1);
					return (
						<RouteCard
							key={locationId}
							handleShow={handleShow}
							location_id={locationId}
							icon={icon}
							isLast={isLast}
							label={value}
							showDetails={(type !== 'custom' && type !== 'cfs')}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default RouteInfo;
