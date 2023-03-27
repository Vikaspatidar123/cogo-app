import React from 'react';
import { ToolTip } from '@cogoport/front/components/admin';
import startCase from '@cogo/utils/startCase';
import {
	FlexCol,
	ContainerValues,
	Div,
	Wrapper,
	ContentContainer,
} from './styles';

const ConatinerDetails = ({ searchData = {} }) => {
	const { detail = {} } = searchData || {};

	let totalTruckCount = 0;
	const trucks = (Object.values(detail.service_details) || [])
		.filter((element) => element.service_type === 'ftl_freight')
		.map((element) => {
			totalTruckCount += element.trucks_count;
			return {
				truck_type: element.truck_type,
				trucks_count: element.trucks_count,
			};
		});

	const ToolTipDisplay = () => {
		return (trucks || []).map((item) => {
			return (
				<ContentContainer>
					<Div>{startCase(item.truck_type)}</Div>
					<Div>Truck Count:{item.trucks_count}</Div>
				</ContentContainer>
			);
		});
	};

	return (
		<>
			{detail.search_type === 'ftl_freight' ? (
				<FlexCol>
					{detail.load_selection_type === 'truck' ? (
						<>
							<Div>
								<span>Truck Type:</span>
								<ToolTip
									placement="bottom"
									theme="light"
									content={ToolTipDisplay()}
									maxWidth={800}
								>
									<ContainerValues>
										{startCase(detail.truck_type)}
										{trucks.length > 1 ? (
											<div className="moreTruck">+{trucks.length - 1} more</div>
										) : null}
									</ContainerValues>
								</ToolTip>
							</Div>
							<Div style={{ marginLeft: '12px' }}>
								<span>Total Truck Count</span>
								<ContainerValues>{totalTruckCount}</ContainerValues>
							</Div>
							<Div style={{ marginLeft: '12px' }}>
								<span>Commodity:</span>
								<ContainerValues>
									{detail.commodity || 'General'}
								</ContainerValues>
							</Div>
						</>
					) : (
						<Wrapper>
							<Div style={{ marginLeft: '12px' }}>
								<span>Commodity</span>
								<ContainerValues>
									{startCase(detail.commodity || 'General')}
								</ContainerValues>
							</Div>

							{detail?.volume ? (
								<Div style={{ marginLeft: '8px' }}>
									<span>Volume</span>
									<ContainerValues>{detail.volume} cc</ContainerValues>
								</Div>
							) : null}
							{detail?.weight ? (
								<Div style={{ marginLeft: '8px' }}>
									<span>Weight</span>
									<ContainerValues>{detail.weight} Kg</ContainerValues>
								</Div>
							) : null}
						</Wrapper>
					)}
				</FlexCol>
			) : (
				<Wrapper>
					<Div style={{ marginLeft: '12px' }}>
						<span>Commodity</span>
						<ContainerValues>{detail.commodity || 'General'}</ContainerValues>
					</Div>

					{detail?.volume ? (
						<Div style={{ marginLeft: '8px' }}>
							<span>Volume</span>
							<ContainerValues>{detail.volume} cc</ContainerValues>
						</Div>
					) : null}
					{detail.weight ? (
						<Div style={{ marginLeft: '8px' }}>
							<span>Weight</span>
							<ContainerValues>{detail.weight} Kg</ContainerValues>
						</Div>
					) : null}
				</Wrapper>
			)}
		</>
	);
};

export default ConatinerDetails;
