import { Button, Tooltip, Popover } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

import convertHourToDate from '@/ui/commons/utils/converHourToDay';

const SERVICE_TYPE_MAPPING = {
	T2T : 'Terminal 2 Terminal',
	T2D : 'Terminal 2 Door',
	D2T : 'Door 2 Terminal',
	D2D : 'Door 2 Door',
};

const handleCommodity = (commodity) => {
	let value = '';

	if (isEmpty(commodity)) {
		value = 'All Commodities';
	} else {
		value = commodity;
	}

	return value;
};

function GetMultiContainerDetails({ service_details }) {
	return (
		<div className={styles.styled_flex}>
			{Object.values(service_details).map((item) => {
				const {
					container_size = '',
					containers_count = '',
					commodity = '',
					container_type = '',
					cargo_weight_per_container = '',
					additional_service_type = '',
				} = item || {};

				return (
					<div className={styles.div} key={item?.id} style={{ fontSize: '12px' }}>
						{`${container_size}FT x ${containers_count} | ${startCase(
							handleCommodity(commodity),
						)} | ${startCase(
							container_type,
						)} | ${cargo_weight_per_container}MT | ${additional_service_type}`}
					</div>
				);
			})}
		</div>
	);
}

function ContainerDetails({ data = {}, details = {}, service_type }) {
	const { service_details = {} } = details;

	const {
		container_size = '',
		containers_count = '',
		commodity = '',
		container_type = '',
		cargo_weight_per_container = '',
	} = details || {};

	const {
		detention_free_time = '',
		transit_time = '',
		trailer_type = '',
		trailer_count = '',
	} = data || {};

	return (
		<>
			{service_type === 'rail_domestic_freight' && (
				<>
					<div className={styles.div}>
						<div className={styles.flex}>
							<div className={styles.container_values}>
								{`${container_size}FT x ${containers_count} | ${startCase(
									handleCommodity(commodity),
								)} | ${startCase(
									container_type,
								)} | ${cargo_weight_per_container}MT`}
							</div>
							<Popover
								content={
									<GetMultiContainerDetails service_details={service_details} />
								}
								theme="light"
								animation="perspective"
								interactive
							>
								{Object.keys(service_details).length > 1 && (
									<Button
										type="button"
										style={{ marginLeft: '12px', fontSize: '8px' }}
										className=" primary  sm text"
									>
										view all
									</Button>
								)}
							</Popover>
						</div>
					</div>

					<div className={styles.div}>
						<span>Service Type: </span>
						<div className={styles.container_values}>
							{SERVICE_TYPE_MAPPING[details.additional_service_type]}
						</div>
					</div>
				</>
			)}

			{service_type === 'trailer_freight' && (
				<>
					<div className={styles.div}>
						<span>Detention Free Time: </span>
						<div className={styles.container_values}>
							{convertHourToDate(detention_free_time || '12')}
						</div>
					</div>
					<div className={styles.div}>
						<span>Transit Time: </span>
						<div className={styles.container_values}>
							{convertHourToDate(transit_time || '12')}
						</div>
					</div>
					<Tooltip
						placement="top"
						content={
							<div className={styles.container_values}>{startCase(trailer_type || '')}</div>
						}
						theme="light"
						interactive
					>
						<div className={styles.div}>
							<span>Trailer Type: </span>
							<div className={styles.container_values}>
								{startCase(trailer_type || 'pen_body_pickup_1ton')}
							</div>
						</div>
					</Tooltip>
					<div className={styles.div}>
						<span>Trailer Count: </span>
						<div className={styles.container_values}>{startCase(trailer_count || '1')}</div>
					</div>
				</>
			)}
		</>
	);
}

export default ContainerDetails;
