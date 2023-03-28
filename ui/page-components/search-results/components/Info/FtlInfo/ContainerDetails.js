import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function ConatinerDetails({ searchData = {} }) {
	const { detail = {} } = searchData || {};

	let totalTruckCount = 0;
	const trucks = (Object.values(detail.service_details) || [])
		.filter((element) => element.service_type === 'ftl_freight')
		.map((element) => {
			totalTruckCount += element.trucks_count;
			return {
				truck_type   : element.truck_type,
				trucks_count : element.trucks_count,
			};
		});

	const ToolTipDisplay = () => (trucks || []).map((item) => (
		<div className={styles.content_container}>
			<div className={styles.div}>{startCase(item.truck_type)}</div>
			<div className={styles.div}>
				Truck Count:
				{item.trucks_count}
			</div>
		</div>
	));

	return (
		<>
			{' '}
			{detail.search_type === 'ftl_freight' ? (
				<div className={styles.flex_col}>
					{detail.load_selection_type === 'truck' ? (
						<>
							<div className={styles.div}>
								<span>Truck Type:</span>
								<Tooltip
									placement="bottom"
									theme="light"
									content={ToolTipDisplay()}
									maxWidth={800}
								>
									<div className={styles.container_values}>
										{startCase(detail.truck_type)}
										{trucks.length > 1 ? (
											<div className="moreTruck">
												+
												{trucks.length - 1}
												{' '}
												more
											</div>
										) : null}
									</div>
								</Tooltip>
							</div>
							<div className={styles.div} style={{ marginLeft: '12px' }}>
								<span>Total Truck Count</span>
								<div className={styles.container_values}>{totalTruckCount}</div>
							</div>
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
									<div className={styles.container_values}>
										{detail.volume}
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
								{detail.volume}
								{' '}
								cc
							</div>
						</div>
					) : null}
					{detail.weight ? (
						<div className={styles.div} style={{ marginLeft: '8px' }}>
							<span>Weight</span>
							<div className={styles.container_values}>
								{detail.weight}
								{' '}
								Kg
							</div>
						</div>
					) : null}
				</div>
			)}
		</>
	);
}

export default ConatinerDetails;
