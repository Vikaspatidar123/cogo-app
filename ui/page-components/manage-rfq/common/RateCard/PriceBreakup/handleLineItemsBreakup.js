import { startCase } from '@cogoport/utils';

import handleLineItems from './handleLineItems';

import formatAmount from '@/ui/commons/utils/formatAmount';

const handleLineItemsBreakup = (item, details) => {
	const service = details?.service_details[item?.id];
	const { is_rate_available = false, service_type: serviceType = '' } =		item || {};

	const {
		container_size,
		container_type,
		commodity,
		packages = [],
		truck_type = '',
		service_type = '',
		terminal_charge_type = '',
		trade_type = '',
		volume = '',
		weight = '',
	} = service || {};

	const { packing_type = '', handling_type = '' } = packages[0] || {};

	let size = '';
	let type = '';
	let comm = '';
	let truckType = '';
	let packageType = '';
	let packageHandlingType = '';

	if (container_size) {
		if (container_type || commodity) {
			size = `${container_size} ft, `;
		} else {
			size = `${container_size} ft`;
		}
	}

	if (container_type) {
		if (commodity) {
			type = `${startCase(container_type)}, `;
		} else {
			type = startCase(container_type);
		}
	}

	if (truck_type) {
		truckType = startCase(truck_type);
	}

	if (commodity) {
		comm = startCase(commodity);
	}

	if (packages.length) {
		packageType = startCase(packing_type);
		packageHandlingType = startCase(handling_type);
	}

	const fclLocals = ['fcl_freight_local', 'air_freight_local'].includes(
		serviceType,
	)
		? 'Local charges will be billed at Actual'
		: 'Fetching Rates';

	const handleService = () => {
		let additonalInfo = '';
		if (volume) {
			additonalInfo = `VOL: ${volume}cbm`;
		}
		if (weight) {
			additonalInfo += ` WT: ${weight}`;
		}
		if (
			['air_freight', 'air_freight_local'].includes(service_type)
			&& trade_type !== 'domestic'
		) {
			return `${size}${type}${comm} ${packageType} ${packageHandlingType} ${additonalInfo}`;
		}
		if (service_type === 'ftl_freight') {
			return `${size}${type}${truckType}`;
		}
		if (
			trade_type === 'domestic'
			&& terminal_charge_type
			&& service_type === 'air_freight_local'
		) {
			return `${size}${type}${comm} ${packageType} ${packageHandlingType} ${additonalInfo}`;
		}
		return `${size}${type}${comm}`;
	};

	return [
		...(is_rate_available ? handleLineItems({ items: item?.line_items }) : []),
		{
			features : handleService(),
			price    : is_rate_available
				? formatAmount(
					item?.price_discounted,
					item?.total_price_currency,
					{
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 0,
					},
				)
				: fclLocals,
		},
	];
};

export default handleLineItemsBreakup;
