import { IcMArrowNext } from '@cogoport/icons-react';

import { getLocation } from '../../../../../../../common/location';

import styles from './styles.module.css';

import ContainerDetails from '@/ui/page-components/new-dashboard/common/ContainerDetails';

const onlySingleLocation = [
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'fcl_cfs',
];
function Container({ item }) {
	const containerInfoData = {
		container_size   : item?.container_size,
		container_type   : item?.container_type,
		containers_count : item?.containers_count,
		commodity        : item?.commodity,
		cargo_weight_per_container:
        item?.cargo_weight_per_container,
		inco_term    : item?.inco_term,
		rates_count  : item?.rates_count,
		trucks_count : item?.trucks_count,
		trade_type   : item?.trade_type,
		packages     : item?.packages,
		volum        : item?.volum,
		weight       : item?.weight,
	};
	return (
		<div className={styles.container}>
			{onlySingleLocation.includes(
				item?.service_type || item?.shipment_type,
			) ? (
				<div className={styles.second_data}>
					{getLocation(true, item).location}
					<span
						className={styles.location_span}
					>
						{getLocation(false, item).country}
					</span>
				</div>
				) : (
					<div className={styles.second_data}>
						<div className={styles.origin}>
							{getLocation(true, item).location}
							<span
								className={styles.location_span}
							>
								{getLocation(
									false,
									item,
								).country}
							</span>
						</div>
						<div className={styles.icon}>
							<IcMArrowNext />
						</div>
						<div />
						<div className={styles.origin}>
							{getLocation(false, item)
								.location}
							<span
								className={styles.location_span}
							>
								{getLocation(
									false,
									item,
								).country}
							</span>
						</div>
					</div>
				)}
			<ContainerDetails
				containerInfoData={containerInfoData}
				service_type={item?.service_type || item?.shipment_type}
			/>
		</div>
	);
}
export default Container;
