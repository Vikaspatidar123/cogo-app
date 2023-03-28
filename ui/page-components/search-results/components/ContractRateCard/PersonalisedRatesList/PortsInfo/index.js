import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function PortsInfo({
	originPort = {},
	destinationPort = {},
	separator = null,
	trip = '',
	showShortName = false,
}) {
	return (
		<div className={`${styles.container}  ${styles.ports_info__container}`}>
			<Tooltip
				content={<div className={styles.port_name_tooltip}>{originPort?.display_name}</div>}
			>
				<p className="ports-info__port_name ports_info__port_name__origin">
					{showShortName ? originPort.name : originPort?.display_name}
				</p>
			</Tooltip>

			{originPort?.display_name && destinationPort?.display_name && (
				<div className="ports_info__ports_separator__container">
					{separator}
					<span className="way">{startCase(trip?.replace('_', ' '))}</span>
				</div>
			)}

			<Tooltip
				content={
					<div className={styles.port_name_tooltip}>{destinationPort?.display_name}</div>
			}
			>
				<p className="ports_info__port_name ports_info__port_name__destination">
					{showShortName ? destinationPort.name : destinationPort?.display_name}
				</p>
			</Tooltip>
		</div>
	);
}

export default PortsInfo;
