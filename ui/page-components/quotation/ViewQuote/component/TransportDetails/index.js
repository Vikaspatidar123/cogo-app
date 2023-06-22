import { IcMLocation } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const SERVICE_TYPE = {
	FCL_FREIGHT : 'FCL',
	LCL_FREIGHT : 'LCL',
	AIR_FREIGHT : 'AIR',
};

function RenderTag({ transportMode, serviceType }) {
	if (transportMode === 'AIR') {
		return <div className={styles.tag}>{transportMode}</div>;
	}
	return (
		<>
			<div className={styles.tag}>{transportMode}</div>
			<div className={styles.tag}>{SERVICE_TYPE[serviceType]}</div>
		</>
	);
}

const TRANSPORT_ICON_MAPPING = {
	OCEAN : <Image src={GLOBAL_CONSTANTS.image_url.ship_icon} width={30} height={30} alt="ocean" />,
	AIR   : <Image src={GLOBAL_CONSTANTS.image_url.air_icon} width={30} height={30} alt="air" />,
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
				{TRANSPORT_ICON_MAPPING[transportMode]}
				<IcMLocation className={styles.destination} fill="#f46a6a" width={30} height={30} />
			</div>

			<div className={styles.port_details}>
				<div className={styles.origin}>{originPortName}</div>

				<div className={styles.tags_div}>
					<RenderTag transportMode={transportMode} serviceType={serviceType} />
				</div>

				<div className={styles.destination}>{destinationPortName}</div>
			</div>
		</div>
	);
}

export default TransportDetails;
