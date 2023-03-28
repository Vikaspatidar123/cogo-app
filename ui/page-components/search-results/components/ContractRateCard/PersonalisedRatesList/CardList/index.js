import { useState } from 'react';

import BookNow from '../BookNow';
import ContainerInfo from '../ContainerInfo';
import CostBreakdown from '../CostBreakdown';
import PortsInfo from '../PortsInfo';
import TouchPoints from '../TouchPoints';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function CardList({ data = {}, details }) {
	const {
		origin_location = {},
		line_items = [],
		destination_location = {},
		trip_type = '',
		total_price = 0,
		touch_points = {},
		total_price_currency = '',
		service_type = '',
		contract_reference_id = '',
		transit_time = '',
	} = data || {};

	const [showTable, setshowTable] = useState(false);

	const perTruck = formatAmount({
		amount   : total_price,
		currency : total_price_currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 0,
		},
	});

	return (
		<div className={styles.container}>
			<div className={styles.gradient}>
				<div className={styles.wave}>
					Contract ID:
					{contract_reference_id}
				</div>
			</div>

			<div className={styles.row}>
				<div className={styles.col}>
					<div className={styles.main_container}>
						<div className={styles.Row}>
							<div className={styles.col}>
								<div className={styles.ports_container}>
									<PortsInfo
										originPort={origin_location}
										destinationPort={destination_location}
										trip={trip_type}
										separator={(
											<img
												src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/union-2.svg"
												alt="union-icon"
												className="ports-direction-svg"
											/>
										)}
									/>
								</div>
							</div>

							<TouchPoints
								touch_points={touch_points}
								service_type={service_type}
								transit_time={transit_time}
							/>

							<div className={styles.col}>
								<div className={styles.styled_hr} />

								<ContainerInfo data={data} source="list_item" />
							</div>
						</div>
					</div>
				</div>

				<BookNow
					perTruck={perTruck}
					service_type={service_type}
					data={data}
					spot_search_id={details?.id}
				/>
			</div>
			<div />

			<div
				className={`${styles.inside_container}
			         ${styles.accordion}`}
				aria-expanded={showTable}
			>
				<CostBreakdown
					line_items={line_items}
					total_price={total_price}
					total_price_currency={total_price_currency}
				/>
			</div>

			<div className={styles.footer}>
				<div className={styles.details} role="presentation" onClick={() => setshowTable(!showTable)}>
					View Details
					{/* <ToggleIcon toggleDropdown={showTable} /> */}
				</div>

				<div className={styles.custom_text}>
					Incidentals, Surcharges, any additional charges will apply as per
					contract terms
				</div>
			</div>
		</div>
	);
}

export default CardList;
