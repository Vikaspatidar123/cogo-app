import { isEmpty, startCase } from '@cogoport/front/utils';
import React from 'react';
import ToolTip from '@cogoport/front/components/admin/ToolTip';
import { getGrossFormattedData } from '../utils/getGrossFormattedData';

import {
	Container,
	Details,
	DetailsContainer,
	DisplayContainer,
	ToolTipContent,
} from './styles';

const ShowGrossInfo = ({
	loadData = {},
	setShowPopover = () => {},
	showPopover = false,
}) => {
	const cargo = getGrossFormattedData(loadData);

	const toolTipDisplay = () => {
		return (
			<ToolTipContent>
				PKG type - {cargo?.packing_type} || QTY - {cargo?.packages_count} || WT-
				{cargo?.package_weight} kgs VOL -{cargo?.volume}
				cc
			</ToolTipContent>
		);
	};

	return (
		<ToolTip
			interactive
			theme="light"
			content={toolTipDisplay()}
			placement="top"
			animation="shift-away"
		>
			<Container onClick={() => setShowPopover(!showPopover)}>
				{isEmpty(cargo) ? (
					<div className="text">What are you shipping</div>
				) : (
					<DetailsContainer>
						<DisplayContainer>
							<Details>
								{startCase(cargo?.packing_type)} x {cargo?.packages_count}
							</Details>
							<Details>Weight: {cargo?.package_weight}</Details>
							<Details> {startCase(cargo?.handling_type)}</Details>
						</DisplayContainer>
					</DetailsContainer>
				)}
			</Container>
		</ToolTip>
	);
};

export default ShowGrossInfo;
