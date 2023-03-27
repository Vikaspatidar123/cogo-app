import React from 'react';
import { ToolTip } from '@cogoport/front/components';
import { startCase } from '@cogoport/front/utils';
import { Container, PortNameTooltip } from './styles';

const PortsInfo = ({
	originPort = {},
	destinationPort = {},
	separator = null,
	trip = '',
	showShortName = false,
}) => (
	<Container className="ports-info__container">
		<ToolTip
			content={<PortNameTooltip>{originPort?.display_name}</PortNameTooltip>}
		>
			<p className="ports-info__port-name ports-info__port-name--origin">
				{showShortName ? originPort.name : originPort?.display_name}
			</p>
		</ToolTip>

		{originPort?.display_name && destinationPort?.display_name && (
			<div className="ports-info__ports-separator__container">
				{separator}
				<span className="way">{startCase(trip?.replace('_', ' '))}</span>
			</div>
		)}

		<ToolTip
			content={
				<PortNameTooltip>{destinationPort?.display_name}</PortNameTooltip>
			}
		>
			<p className="ports-info__port-name ports-info__port-name--destination">
				{showShortName ? destinationPort.name : destinationPort?.display_name}
			</p>
		</ToolTip>
	</Container>
);

export default PortsInfo;
