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
	origin_main_port = {},
	destination_main_port = {},
}) {
	const countryName = (val) => val?.split(',').slice(-1)[0];

	const origin = serviceType === 'air_freight' ? originAirport : originPort;
	const destination = serviceType === 'air_freight' ? destinationAirport : destinationPort;

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
	const { name: originMainPortName = '' } = origin_main_port || {};
	const { name: destinationMainPortName = '' } = destination_main_port || {};
	return (
		<div className={styles.container}>
			<div className={styles.location}>
				<TooltipContent
					portDisplayName={display_name}
					portName={originName}
					portCode={port_code}
				/>
				<div className={styles.country}>{startCase(countryName(display_name || ''))}</div>
				{originMainPortName ? (
					<div className={styles.country}>
						via
						{' '}
						{originMainPortName}
					</div>
				) : null}
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
				{destinationMainPortName ? (
					<div className={styles.country}>
						via
						{' '}
						{destinationMainPortName}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Route;
