import convertHourToDay from '@cogo/utils/converHourToDay';
import startCase from '@cogo/utils/startCase';
import { ToolTip } from '@cogoport/front/components/admin';
import React from 'react';

import {
	FlexCol,
	ContainerValues,
	Div,
	Wrapper,
	ContentContainer,
	ToolTipContent,
} from './styles';

function ContainerDetails({ searchData = {}, data = {} }) {
	const { service_rates = {} } = data || {};

	const { detail = {} } = searchData || {};

	const truckDetails = (Object.values(service_rates) || []).filter(
		(element) => element.service_type === 'ftl_freight',
	);

	const perPackageDetails = (Object.values(service_rates) || []).map(
		(perPackage) => ({
			line_items   : perPackage.line_items,
			transit_time : perPackage.transit_time,
		}),
	);

	const trucks = truckDetails;

	const ToolTipDisplay = () => (trucks || []).map((item, index) => (
		<ContentContainer>
			<ToolTipContent>
				{index + 1}
				{' '}
				-
				<span>{startCase(item.truck_type)}</span>
				|
				<span>
					Truck Count:
					{item.trucks_count}
				</span>
				|
				<span>
					Detention Free Time:
					{convertHourToDay(item?.detention_free_time)}
				</span>
				|
				<span>
					{' '}
					Transit Time:
					{convertHourToDay(item?.transit_time)}
				</span>
			</ToolTipContent>
		</ContentContainer>
	));

	return (
		<>
			{data?.service_type === 'ftl_freight' ? (
				<FlexCol>
					{detail?.load_selection_type === 'truck' ? (
						<>
							<Div>
								<span>Truck Type:</span>
								<ContainerValues>
									{startCase(trucks[0]?.truck_type)}
								</ContainerValues>
								{trucks.length > 1 ? (
									<ToolTip
										placement="bottom"
										theme="light"
										content={ToolTipDisplay()}
										maxWidth={800}
									>
										<div className="moreTruck">
											{' '}
											+
											{trucks.length - 1}
											{' '}
											more
											{' '}
										</div>
									</ToolTip>
								) : null}
							</Div>
							{trucks.length === 1 ? (
								<>
									<Div>
										{' '}
										Truck count :
										{truckDetails[0]?.trucks_count}
									</Div>
									{truckDetails[0]?.detention_free_time && (
										<Div>
											{' '}
											Detention Free Time:
											{' '}
											{convertHourToDay(
												truckDetails[0]?.detention_free_time,
											)}
											{' '}
										</Div>
									)}
									{truckDetails[0]?.transit_time && (
										<Div>
											{' '}
											Transit Time:
											{' '}
											{convertHourToDay(truckDetails[0]?.transit_time)}
											{' '}
										</Div>
									)}
								</>
							) : null}

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
									<ContainerValues>{detail?.volume}</ContainerValues>
								</Div>
							) : null}
							{detail?.weight ? (
								<Div style={{ marginLeft: '8px' }}>
									<span>Weight</span>
									<ContainerValues>{detail?.weight}</ContainerValues>
								</Div>
							) : null}
							{detail?.packages[0]?.packages_count ? (
								<Div>
									<span>Packages count</span>
									<ContainerValues>
										{detail?.packages[0].packages_count}
									</ContainerValues>
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
							<ContainerValues>
								{detail?.volume}
								{' '}
								cc
							</ContainerValues>
						</Div>
					) : null}
					{detail?.weight ? (
						<Div style={{ marginLeft: '8px' }}>
							<span>Weight</span>
							<ContainerValues>
								{detail.weight}
								{' '}
								Kg
							</ContainerValues>
						</Div>
					) : null}

					{perPackageDetails[0]?.line_items ? (
						<Div style={{ marginLeft: '8px' }}>
							<span>Chargable weight:</span>
							<ContainerValues>
								{perPackageDetails[0].line_items[0]?.quantity.toFixed(2)}
								{' '}
								Kg
							</ContainerValues>
						</Div>
					) : null}
					{perPackageDetails[0]?.transit_time ? (
						<Div style={{ marginLeft: '8px' }}>
							<span>Transit Time</span>
							<ContainerValues>
								{convertHourToDay(perPackageDetails[0].transit_time)}
								{' '}
							</ContainerValues>
						</Div>
					) : null}
				</Wrapper>
			)}
		</>
	);
}

export default ContainerDetails;
