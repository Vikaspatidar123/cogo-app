import { IcMLocation } from '@cogoport/icons-react';

import iconUrl from '../../../utils/iconUrl.json';

import styles from './styles.module.css';

const SERVICE_TYPE = {
	FCL_FREIGHT : 'FCL',
	LCL_FREIGHT : 'LCL',
	AIR_FREIGHT : 'AIR',
};

const renderTag = ({ transportMode, serviceType }) => {
	if (transportMode === 'AIR') {
		return <div className={styles.tag}>{transportMode}</div>;
	}

	return (
		<>
			<div className={styles.tag}>{transportMode}</div>
			<div className={styles.tag}>{SERVICE_TYPE[serviceType]}</div>
		</>
	);
};

function TransportDetails({
	originPortName,
	destinationPortName,
	transportMode,
	serviceType,
	incoterm,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<p className={styles.text}>
					<b>Incoterm: </b>
					{incoterm}
				</p>
			</div>

			<div className={styles.icon_container}>
				<IcMLocation className={styles.origin} fill="#f46a6a" width={30} height={30} />
				{transportMode === 'OCEAN' && (
					<img
						className={styles.img}
						src={iconUrl.ship}
						// src="https://cogoport-production.sgp1.digitaloceanspaces.com/df6934846ee83d2177bb7e53981fb2f2/MicrosoftTeams-image%20%285%29.png"
						alt="OCEAN"
					/>
				)}
				{transportMode === 'AIR' && (
					<img
						className={styles.img}
						src={iconUrl.air}
						// src="https://cogoport-production.sgp1.digitaloceanspaces.com/9a6560a868419a29a36bdc1ebafd5cd7/MicrosoftTeams-image%20%286%29.png"
						alt="AIR"
					/>
				)}
				<IcMLocation className={styles.destination} fill="#f46a6a" width={30} height={30} />
			</div>

			<div className={styles.port_details}>
				<div className={styles.origin}>{originPortName}</div>
				<div className={styles.tags_div}>{renderTag({ transportMode, serviceType })}</div>
				<div className={styles.destination}>{destinationPortName}</div>
			</div>
		</div>
	);
}

export default TransportDetails;
