import { IcMPortArrow } from '@cogoport/icons-react';

import singleLocationServices from '../../../../configurations/common/single-location-services.json';

import Item from './Item';
import styles from './styles.module.css';

function PortDetails({ data = {}, routeInfo = {} }) {
	const { shipment_type, service_type } = data;
	const isSingleLocation =		singleLocationServices.includes(shipment_type)
		|| singleLocationServices.includes(service_type);

	const origin =		data[routeInfo.origin_pickup]
		|| data[routeInfo.origin_port]
		|| data?.origin_location
		|| data?.port;

	const destination =		data[routeInfo.destination_drop]
		|| data[routeInfo.destination_port]
		|| data?.destination_location;

	return (
		<div className={styles.container}>
			{isSingleLocation && (
				<div className={styles.text}>
					{data?.trade_type === 'export'
						? 'Origin Location: '
						: 'Destination Location: '}
				</div>
			)}
			<Item location={origin} search_type={shipment_type || service_type} />

			{!isSingleLocation && (
				<div className={styles.icon}>
					<IcMPortArrow />
				</div>
			)}

			{!isSingleLocation && (
				<Item
					location={destination}
					search_type={shipment_type || service_type}
				/>
			)}
		</div>
	);
}

export default PortDetails;
