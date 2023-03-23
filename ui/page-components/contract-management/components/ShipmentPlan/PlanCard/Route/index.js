import { IcMPortArrow } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import TooltipContent from '@/ui/page-components/contract-management/common/TooltipContent';

function Route({
	originPort = {},
	destinationPort = {},
	destinationAirport = {},
	originAirport = {},
	serviceType = '',
}) {
	const countryName = (val) => val?.split(',').slice(-1)[0];

	const origin = serviceType === 'air_freight' ? originAirport : originPort;
	const destination =		serviceType === 'air_freight' ? destinationAirport : destinationPort;

	const {
		display_name = '',
		port_code = '',
		name: originName = '',
	} = origin || {};

	const {
		display_name: destinationDisplayName = '',
		port_code: destinationCode = '',
		name: destinationName = '',
	} = destination || {};
	return (
		<div className={styles.container}>
			<div className={styles.location}>
				<TooltipContent
					portDisplayName={display_name}
					portName={originName}
					portCode={port_code}
				/>
				<div className={styles.country}>{startCase(countryName(display_name || ''))}</div>
			</div>
			<div className={styles.icon}>
				<IcMPortArrow />
			</div>
			<div className={styles.location}>
				<TooltipContent
					portDisplayName={destinationDisplayName}
					portName={destinationName}
					portCode={destinationCode}
				/>
				<div className={styles.country}>
					{startCase(countryName(destinationDisplayName || ''))}
				</div>
			</div>
		</div>
	);
}

export default Route;
