import { Tooltip, Button, Popover } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

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
					<div className={styles.multi_container_values} key={id}>
						{`${container_size}FT x ${containers_count} | ${startCase(
							handleCommodity(commodity),
						)} | ${startCase(
							container_type,
						)} | ${cargo_weight_per_container}MT | ${additional_service_type}`}
					</div>
				);
			})}
		</Flex>
	);
}

function PopoverComponent({ service_details }) {
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
}

function ConatinerDetails({
	data = {},
	service_type,
	service_details = {},
}) {
	const {
		container_size = '',
		containers_count = '',
		commodity = '',
		container_type = '',
		cargo_weight_per_container = '',
		additional_service_type = '',
	} = data || {};

	return (
		<div className={styles.container_div}>
			<div className={styles.div}>
				<div style={{ display: 'flex' }}>
					<Tooltip
						placement="bottom"
						interactive
						content={(
							<div>
								{`${container_size}FT x ${containers_count} | ${handleCommodity(
									commodity,
								)} | ${startCase(
									container_type,
								)} | ${cargo_weight_per_container}MT`}
							</div>
						)}
					>
						<div>
							<div className={styles.container_values}>
								{`${container_size}FT x ${containers_count} | ${handleCommodity(
									commodity,
								)} | ${startCase(
									container_type,
								)} | ${cargo_weight_per_container}MT`}
							</div>
						</div>
					</Tooltip>

					{service_type === 'trailer_freight' && (
						<PopoverComponent service_details={service_details} />
					)}
				</div>

				{service_type === 'rail_domestic_freight' && (
					<div style={{ display: 'flex' }}>
						<div className={styles.container_values}>{`Service Type: ${additional_service_type}`}</div>
						<PopoverComponent service_details={service_details} />
					</div>
				)}
			</div>
		</div>
	);
}

export default ConatinerDetails;
