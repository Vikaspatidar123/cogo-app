import React from 'react';
import { ToolTip } from '@cogoport/front/components/admin';
import { startCase } from '@cogoport/front/utils';

import { Container, DetailsContainer, Details, ToolTipContent } from './styles';

const ShowTruckInfo = ({
	loadData = {},
	setShowPopover = () => {},
	showPopover,
}) => {
	const trucks = loadData?.truck_details || [];

	const toolTipDisplay = () => {
		return (trucks || []).map((item, index) => {
			return (
				<ToolTipContent
					className={index === (trucks || []).length - 1 ? 'no-margin' : ''}
				>
					{index + 1} - Type : {startCase(item.truck_type)}, Count :{' '}
					{item.trucks_count}
				</ToolTipContent>
			);
		});
	};

	return (
		<ToolTip
			theme="light"
			placement="top"
			animation="shift-away"
			content={toolTipDisplay()}
		>
			<Container onClick={() => setShowPopover(!showPopover)}>
				{!trucks?.length ? (
					<div className="text">What are you shipping</div>
				) : (
					<DetailsContainer>
						{(trucks || []).map((item) => {
							return (
								<>
									<Details>{startCase(item?.truck_type)}</Details>

									<Details>{item?.trucks_count}</Details>
								</>
							);
						})}
					</DetailsContainer>
				)}
			</Container>
		</ToolTip>
	);
};

export default ShowTruckInfo;
