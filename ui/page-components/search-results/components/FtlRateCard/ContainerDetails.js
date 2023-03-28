import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ContainerDetails({ searchData = {}, data = {} }) {
	const { service_rates = {} } = data || {};

	const { detail = {} } = searchData || {};

	const truckDetails = (Object.values(service_rates) || []).filter(
		(element) => element.service_type === 'ftl_freight',
	);

	const perPackageDetails = (Object.values(service_rates) || []).map(
		(perPackage) => ({
			line_items   : perPackage.line_items,
			transit_time : perPackage.transit_time,
		}),
	);

	const trucks = truckDetails;

	const ToolTipDisplay = () => (trucks || []).map((item, index) => (
		<div className={styles.content_container}>
			<div className={styles.tool_tip_content}>
				{index + 1}
				{' '}
				-
				<span>{startCase(item.truck_type)}</span>
				|
				<span>
					Truck Count:
					{item.trucks_count}
				</span>
				|
				<span>
					Detention Free Time:
					{convertHourToDay(item?.detention_free_time)}
				</span>
				|
				<span>
					{' '}
					Transit Time:
					{convertHourToDay(item?.transit_time)}
				</span>
			</div>
		</div>
	));

	return (
		<>
			{' '}
			{data?.service_type === 'ftl_freight' ? (
				<div className={styles.flex_col}>
					{detail?.load_selection_type === 'truck' ? (
						<>
							<div className={styles.div}>
								<span>Truck Type:</span>
								<div className={styles.container_values}>
									{startCase(trucks[0]?.truck_type)}
								</div>
								{trucks.length > 1 ? (
									<Tooltip
										placement="bottom"
										theme="light"
										content={ToolTipDisplay()}
										maxWidth={800}
									>
										<div className="moreTruck">
											{' '}
											+
											{trucks.length - 1}
											{' '}
											more
											{' '}
										</div>
									</Tooltip>
								) : null}
							</div>
							{trucks.length === 1 ? (
								<>
									<div className={styles.div}>
										{' '}
										Truck count :
										{truckDetails[0]?.trucks_count}
									</div>
									{truckDetails[0]?.detention_free_time && (
										<div className={styles.div}>
											{' '}
											Detention Free Time:
											{' '}
											{convertHourToDay(
												truckDetails[0]?.detention_free_time,
											)}
											{' '}
										</div>
									)}
									{truckDetails[0]?.transit_time && (
										<div className={styles.div}>
											{' '}
											Transit Time:
											{' '}
											{convertHourToDay(truckDetails[0]?.transit_time)}
											{' '}
										</div>
									)}
								</>
							) : null}

							<div className={styles.div} style={{ marginLeft: '12px' }}>
								<span>Commodity:</span>
								<div className={styles.container_values}>
									{detail.commodity || 'General'}
								</div>
							</div>
						</>
					) : (
						<div className={styles.wrapper}>
							<div className={styles.div} style={{ marginLeft: '12px' }}>
								<span>Commodity</span>
								<div className={styles.container_values}>
									{startCase(detail.commodity || 'General')}
								</div>
							</div>

							{detail?.volume ? (
								<div className={styles.div} style={{ marginLeft: '8px' }}>
									<span>Volume</span>
									<div className={styles.container_values}>{detail?.volume}</div>
								</div>
							) : null}
							{detail?.weight ? (
								<div className={styles.div} style={{ marginLeft: '8px' }}>
									<span>Weight</span>
									<div className={styles.container_values}>{detail?.weight}</div>
								</div>
							) : null}
							{detail?.packages[0]?.packages_count ? (
								<div className={styles.div}>
									<span>Packages count</span>
									<div className={styles.container_values}>
										{detail?.packages[0].packages_count}
									</div>
								</div>
							) : null}
						</div>
					)}
				</div>
			) : (
				<div className={styles.wrapper}>
					<div className={styles.div} style={{ marginLeft: '12px' }}>
						<span>Commodity</span>
						<div className={styles.container_values}>{detail.commodity || 'General'}</div>
					</div>

					{detail?.volume ? (
						<div className={styles.div} style={{ marginLeft: '8px' }}>
							<span>Volume</span>
							<div className={styles.container_values}>
								{detail?.volume}
								{' '}
								cc
							</div>
						</div>
					) : null}
					{detail?.weight ? (
						<div className={styles.div} style={{ marginLeft: '8px' }}>
							<span>Weight</span>
							<div className={styles.container_values}>
								{detail.weight}
								{' '}
								Kg
							</div>
						</div>
					) : null}

					{perPackageDetails[0]?.line_items ? (
						<div className={styles.div} style={{ marginLeft: '8px' }}>
							<span>Chargable weight:</span>
							<div className={styles.container_values}>
								{perPackageDetails[0].line_items[0]?.quantity.toFixed(2)}
								{' '}
								Kg
							</div>
						</div>
					) : null}
					{perPackageDetails[0]?.transit_time ? (
						<div className={styles.div} style={{ marginLeft: '8px' }}>
							<span>Transit Time</span>
							<div className={styles.container_values}>
								{convertHourToDay(perPackageDetails[0].transit_time)}
								{' '}
							</div>
						</div>
					) : null}
				</div>
			)}
		</>
	);
}

export default ContainerDetails;
