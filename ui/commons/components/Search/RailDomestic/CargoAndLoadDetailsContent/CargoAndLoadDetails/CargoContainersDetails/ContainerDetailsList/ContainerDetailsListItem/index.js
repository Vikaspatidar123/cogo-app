import { Flex, Grid, Text } from '@cogoport/front/components';
import { get, startCase } from '@cogoport/front/utils';
import { IcMEdit, IcMDelete } from '@cogoport/icons-react';
import { Container, ActionsButtonContainer } from './styles';
import COMMODITY_TYPE_SUB_TYPE_LABEL_MAPPING from '../configurations/commodity-type-sub-type-label-mapping.json';
// import CARGO_HANDLING_VALUE_LABEL_MAPPING from '../../configurations/cargo-handling-value-label-mapping.json';

const { Row, Col } = Grid;

const items = {
	container_size: (values) => {
		// use the below commented span values after adding transportation details
		const value = get(values, 'container_size');
		return {
			span: 1.5, // span: 1,
			label: 'Container Size',
			value: `${value} FT` || '---',
		};
	},
	container_type: (values) => {
		return {
			span: 2, // span: 1.75,
			label: 'Container Type',
			value: startCase(get(values, 'container_type') || '') || '---',
		};
	},
	cargo_weight_per_container: (values) => {
		const value = get(values, 'cargo_weight_per_container') || '';

		return {
			span: 1.5, // span: 1,
			label: 'Cargo Weight',
			value: value ? `${Number(value).toFixed(2)} MT` : '---',
		};
	},
	container_count: (values) => {
		return {
			span: 1.5, // span: 1,
			label: 'Container Count',
			value: get(values, 'container_count') || '---',
		};
	},
	commodity_type: (values) => {
		return {
			span: 1.5, // span: 1.25,
			label: 'Commodity Type',
			value: startCase(get(values, 'commodity_type') || '') || '---',
		};
	},
	commodity_subtype: (values) => {
		const { commodity_type, commodity_subtype } = values;

		return {
			span: 2,
			label: 'Commodity Sub-Type',
			value:
				get(
					COMMODITY_TYPE_SUB_TYPE_LABEL_MAPPING,
					`['${commodity_type}']['${commodity_subtype}']`,
				) || '---',
		};
	},
	packaging_type: (values) => {
		return {
			span: 1.5, // span: 1,
			label: 'Packaging Type',
			value: startCase(get(values, 'packaging_type') || '') || '---',
		};
	},
	// is_door_pickup: (values) => {
	// 	const { is_door_pickup } = values;

	// 	const isChecked = (is_door_pickup || []).includes(true);

	// 	let valueArr = [];
	// 	if (isChecked) {
	// 		const data = get(values, `is_door_pickup_data`) || {};

	// 		const cargoHandling =
	// 			CARGO_HANDLING_VALUE_LABEL_MAPPING[get(data, 'cargo_handling')] || '';
	// 		// const truckType = startCase(get(data, 'truck_type') || '');
	// 		// const truckCount = get(data, 'trucks_count') || '';

	// 		valueArr = [
	// 			cargoHandling,
	// 			// truckType ? `Truck Type: ${truckType}` : '',
	// 			// truckCount ? `Truck Count: ${truckCount}` : '',
	// 		];
	// 	}

	// 	return {
	// 		span: 1.5,
	// 		label: 'Door Pickup',
	// 		value: valueArr.filter((value) => value).join(', ') || '---',
	// 	};
	// },
	// is_doorstep_delivery: (values) => {
	// 	const { is_doorstep_delivery } = values;

	// 	const isChecked = (is_doorstep_delivery || []).includes(true);

	// 	let valueArr = [];
	// 	if (isChecked) {
	// 		const data = get(values, `is_doorstep_delivery_data`) || {};

	// 		const cargoHandling =
	// 			CARGO_HANDLING_VALUE_LABEL_MAPPING[get(data, 'cargo_handling')] || '';
	// 		// const truckType = startCase(get(data, 'truck_type') || '');
	// 		// const truckCount = get(data, 'trucks_count') || '';

	// 		valueArr = [
	// 			cargoHandling,
	// 			// truckType ? `Truck Type: ${truckType}` : '',
	// 			// truckCount ? `Truck Count: ${truckCount}` : '',
	// 		];
	// 	}

	// 	return {
	// 		span: 1.5,
	// 		label: 'Doorstep Delivery',
	// 		value: valueArr.filter((value) => value).join(', ') || '---',
	// 	};
	// },
};

const ContainerDetailsListItem = ({ item, onEdit, onDelete }) => {
	return (
		<Container>
			<ActionsButtonContainer className="actions-button-container">
				<Flex
					direction="row"
					justifyContent="center"
					alignItems="center"
					padding={2}
				>
					<div
						aria-hidden
						className="icon-container icon-container--edit"
						onClick={() => onEdit()}
					>
						<IcMEdit width={16} height={16} fill="#393f70" />
					</div>

					<div style={{ margin: '0 2px' }}>|</div>

					<div
						aria-hidden
						className="icon-container icon-container--delete"
						onClick={() => onDelete()}
					>
						<IcMDelete width={16} height={16} fill="#393f70" />
					</div>
				</Flex>
			</ActionsButtonContainer>

			<Row>
				{Object.entries(items).map(([key, fun]) => {
					const { span, label, value } = fun(item);

					return (
						<Col key={key} xs={12} sm={6} md={span}>
							<Flex direction="column" margin={4}>
								<Text as="div" size={11} bold={400}>
									{label}:
								</Text>

								<Text as="div" size={12} bold={500}>
									{value}
								</Text>
							</Flex>
						</Col>
					);
				})}
			</Row>
		</Container>
	);
};

export default ContainerDetailsListItem;
