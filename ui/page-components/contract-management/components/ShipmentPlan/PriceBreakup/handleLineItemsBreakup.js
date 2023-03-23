import { isEmpty, startCase } from '@cogoport/utils';
// import usei18n, { getFormattedPrice } from 'i8next';

import handleLineItems from './handleLineItems';

const handleLineItemsBreakup = (item, details, containerCount, source) => {
	// const { numLocale } = usei18n();
	const { line_items = [] } = item || {};

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
	} = details || {};

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
		...(!isEmpty(line_items)
			? handleLineItems({ items: line_items, source })
			: []),
		{
			features: handleService(),
			// price    : !isEmpty(line_items)
			// 	? getFormattedPrice(
			// 		numLocale,
			// 		item?.total_price_discounted / containerCount,
			// 		item?.total_price_currency,
			// 	)
			// 	: 'Local charges will be billed at Actual',
		},
	];
};

export default handleLineItemsBreakup;
