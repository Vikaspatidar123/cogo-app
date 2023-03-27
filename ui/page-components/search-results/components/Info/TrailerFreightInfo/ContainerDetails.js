import React from 'react';
import { isEmpty, startCase } from '@cogoport/front/utils';
import { Flex } from '@cogoport/front/components';
import { Button, Popover, ToolTip } from '@cogoport/front/components/admin';
import {
	ContainerValues,
	Div,
	ContainerDiv,
	MultiContainerValues,
} from './styles';

const handleCommodity = (commodity) => {
	let value = '';

	if (isEmpty(commodity)) {
		value = 'All Commodities';
	} else {
		value = commodity;
	}

	return value;
};

const GetMultiContainerDetails = ({ service_details }) => {
	return (
		<Flex direction="column" style={{ margin: '4px' }}>
			{Object.values(service_details).map((item) => {
				const {
					id = '',
					container_size = '',
					containers_count = '',
					commodity = '',
					container_type = '',
					cargo_weight_per_container = '',
					additional_service_type = '',
				} = item || {};

				return (
					<MultiContainerValues key={id}>
						{`${container_size}FT x ${containers_count} | ${startCase(
							handleCommodity(commodity),
						)} | ${startCase(
							container_type,
						)} | ${cargo_weight_per_container}MT | ${additional_service_type}`}
					</MultiContainerValues>
				);
			})}
		</Flex>
	);
};

const PopoverComponent = ({ service_details }) => {
	const show = Object.keys(service_details).length > 1;

	if (!show) return null;
	return (
		<Popover
			content={<GetMultiContainerDetails service_details={service_details} />}
			theme="light"
			animation="perspective"
			interactive
		>
			{Object.keys(service_details).length > 1 && (
				<Button
					type="button"
					style={{ marginLeft: '16px' }}
					className=" primary  sm text"
				>
					view all
				</Button>
			)}
		</Popover>
	);
};

const ConatinerDetails = ({
	data = {},
	service_type,
	service_details = {},
}) => {
	const {
		container_size = '',
		containers_count = '',
		commodity = '',
		container_type = '',
		cargo_weight_per_container = '',
		additional_service_type = '',
	} = data || {};

	return (
		<ContainerDiv>
			<Div>
				<Flex>
					<ToolTip
						theme="light"
						animation="shift-away"
						interactive
						content={
							<div>
								{`${container_size}FT x ${containers_count} | ${handleCommodity(
									commodity,
								)} | ${startCase(
									container_type,
								)} | ${cargo_weight_per_container}MT`}
							</div>
						}
					>
						<div>
							<ContainerValues>
								{`${container_size}FT x ${containers_count} | ${handleCommodity(
									commodity,
								)} | ${startCase(
									container_type,
								)} | ${cargo_weight_per_container}MT`}
							</ContainerValues>
						</div>
					</ToolTip>

					{service_type === 'trailer_freight' && (
						<PopoverComponent service_details={service_details} />
					)}
				</Flex>

				{service_type === 'rail_domestic_freight' && (
					<Flex>
						<ContainerValues>{`Service Type: ${additional_service_type}`}</ContainerValues>
						<PopoverComponent service_details={service_details} />
					</Flex>
				)}
			</Div>
		</ContainerDiv>
	);
};

export default ConatinerDetails;
