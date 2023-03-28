import convertHourToDate from '@cogo/utils/converHourToDay';
import { Flex } from '@cogoport/front/components';
import { ToolTip, Button, Popover } from '@cogoport/front/components/admin';
import { startCase, isEmpty } from '@cogoport/front/utils';
import React from 'react';

import { Div, ContainerValues, StyledFlex } from './styles';

const SERVICE_TYPE_MAPPING = {
	T2T : 'Terminal 2 Terminal',
	T2D : 'Terminal 2 Door',
	D2T : 'Door 2 Terminal',
	D2D : 'Door 2 Door',
};

const handleCommodity = (commodity) => {
	let value = '';

	if (isEmpty(commodity)) {
		value = 'All Commodities';
	} else {
		value = commodity;
	}

	return value;
};

function GetMultiContainerDetails({ service_details }) {
	return (
		<StyledFlex>
			{Object.values(service_details).map((item) => {
				const {
					container_size = '',
					containers_count = '',
					commodity = '',
					container_type = '',
					cargo_weight_per_container = '',
					additional_service_type = '',
				} = item || {};

				return (
					<Div key={item?.id} style={{ fontSize: '12px' }}>
						{`${container_size}FT x ${containers_count} | ${startCase(
							handleCommodity(commodity),
						)} | ${startCase(
							container_type,
						)} | ${cargo_weight_per_container}MT | ${additional_service_type}`}
					</Div>
				);
			})}
		</StyledFlex>
	);
}

function ContainerDetails({ data = {}, details = {}, service_type }) {
	const { service_details = {} } = details;

	const {
		container_size = '',
		containers_count = '',
		commodity = '',
		container_type = '',
		cargo_weight_per_container = '',
	} = details || {};

	const {
		detention_free_time = '',
		transit_time = '',
		trailer_type = '',
		trailer_count = '',
	} = data || {};

	return (
		<>
			{service_type === 'rail_domestic_freight' && (
				<>
					<Div>
						<Flex>
							<ContainerValues>
								{`${container_size}FT x ${containers_count} | ${startCase(
									handleCommodity(commodity),
								)} | ${startCase(
									container_type,
								)} | ${cargo_weight_per_container}MT`}
							</ContainerValues>
							<Popover
								content={
									<GetMultiContainerDetails service_details={service_details} />
								}
								theme="light"
								animation="perspective"
								interactive
							>
								{Object.keys(service_details).length > 1 && (
									<Button
										type="button"
										style={{ marginLeft: '12px', fontSize: '8px' }}
										className=" primary  sm text"
									>
										view all
									</Button>
								)}
							</Popover>
						</Flex>
					</Div>

					<Div>
						<span>Service Type: </span>
						<ContainerValues>
							{SERVICE_TYPE_MAPPING[details.additional_service_type]}
						</ContainerValues>
					</Div>
				</>
			)}

			{service_type === 'trailer_freight' && (
				<>
					<Div>
						<span>Detention Free Time: </span>
						<ContainerValues>
							{convertHourToDate(detention_free_time || '12')}
						</ContainerValues>
					</Div>
					<Div>
						<span>Transit Time: </span>
						<ContainerValues>
							{convertHourToDate(transit_time || '12')}
						</ContainerValues>
					</Div>
					<ToolTip
						placement="top"
						content={
							<ContainerValues>{startCase(trailer_type || '')}</ContainerValues>
						}
						theme="light"
						interactive
					>
						<Div>
							<span>Trailer Type: </span>
							<ContainerValues>
								{startCase(trailer_type || 'pen_body_pickup_1ton')}
							</ContainerValues>
						</Div>
					</ToolTip>
					<Div>
						<span>Trailer Count: </span>
						<ContainerValues>{startCase(trailer_count || '1')}</ContainerValues>
					</Div>
				</>
			)}
		</>
	);
}

export default ContainerDetails;
