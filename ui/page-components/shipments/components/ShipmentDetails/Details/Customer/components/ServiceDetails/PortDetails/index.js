import { IcMPortArrow } from '@cogoport/icons-react';

import getLocations from '../../../../../../../helpers/locationShipment';

import RouteItem from './RouteItem';
import styles from './styles.module.css';

import { getServiceInfo } from '@/ui/page-components/shipments/utils/getServiceInfo';

function PortDetails({ shipment_data, primary_service = {} }) {
	const { origin, destination } = getLocations(
		'service_type',
		primary_service || {},
	);
	const { serviceIcon } = getServiceInfo({
		service: shipment_data?.shipment_type,
	});

	const renderLocation = () => {
		if (!destination) {
			return (
				<>
					<div className={styles.flag} />
					{origin && <RouteItem location={origin} />}
				</>
			);
		}

		return (
			<div className={styles.location_wrapper}>
				<div className={styles.flag} />
				{ origin && <RouteItem location={origin} />}

				<div className={styles.icon_wrapper}>
					<IcMPortArrow width={28} height={28} />
				</div>
				<div className={styles.flag} />
				{destination && <RouteItem location={destination} />}
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.service_wrapper}>{serviceIcon}</div>
			{renderLocation()}
		</div>
	);
}

export default PortDetails;
