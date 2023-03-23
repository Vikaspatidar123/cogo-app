import React from 'react';
import { startCase } from '@cogoport/front/utils';
import ToolTip from '@cogoport/front/components/admin/ToolTip';
import { getFormattedData } from '../utils/getFormattedData';
import {
	Container,
	Details,
	DetailsContainer,
	ToolTipContent,
	DisplayContainer,
} from './styles';

const ShowPackageInfo = ({
	loadData = {},
	setShowPopover = () => {},
	showPopover = false,
}) => {
	const cargo = getFormattedData(loadData);

	const ToolTipDisplay = () => {
		return (cargo || []).map((item, index) => {
			return (
				<ToolTipContent
					className={index === (cargo || []).length - 1 ? 'no-margin' : ''}
				>
					{index + 1} -PKG type - {item.packing_type} || QTY -{' '}
					{item.packages_count} || WT-
					{item.package_weight} kgs VOL -
					{item.dimensions?.length *
						item.dimensions?.width *
						item.dimensions?.height}
					cc
				</ToolTipContent>
			);
		});
	};

	return (
		<ToolTip
			theme="light"
			content={ToolTipDisplay()}
			placement="top"
			animation="shift-away"
		>
			<Container onClick={() => setShowPopover(!showPopover)}>
				{!cargo?.length ? (
					<div className="text">What are you shipping</div>
				) : (
					<DetailsContainer>
						{(cargo || []).map((item) => {
							return (
								<DisplayContainer>
									<Details>
										{startCase(item?.packing_type)} x {item?.packages_count}
									</Details>

									<Details>Weight: {item?.package_weight}</Details>

									<Details> {startCase(item?.handling_type)}</Details>
								</DisplayContainer>
							);
						})}
					</DetailsContainer>
				)}
			</Container>
		</ToolTip>
	);
};

export default ShowPackageInfo;
