import { isEmpty, startCase } from '@cogoport/utils';

import handleLineItems from './handleLineItems';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatAmount from '@/ui/commons/utils/formatAmount';

const AIR_SERVICES = ['air_freight', 'air_freight_local'];
const ZEROTH_INDEX = GLOBAL_CONSTANTS.zeroth_index;

const handleLineItemsBreakup = (item, source) => {
	const { line_items = [], total_price_discounted = '', total_price_currency = '' } = item || {};

	const {
		container_size,
		container_type = '',
		commodity,
		packages = [],
		truck_type = '',
		service_type = '',
		terminal_charge_type = '',
		trade_type = '',
		volume = '',
		weight = '',
	} = item || {};

	const { packing_type = '', handling_type = '' } = packages?.[ZEROTH_INDEX] || {};

	let size = '';
	let type = startCase(container_type || '');
	const comm = startCase(commodity || '');
	const truckType = startCase(truck_type || '');
	const packageType = startCase(packing_type || '');
	const packageHandlingType = startCase(handling_type);

	if (container_size) {
		size = `${container_size} ft`;

		if (container_type || commodity) {
			size = `${container_size} ft, `;
		}
	}

	if (container_type) {
		type = startCase(container_type);

		if (commodity) {
			type = `${startCase(container_type)}, `;
		}
	}

	const handleService = () => {
		let additonalInfo = '';
		if (volume) {
			additonalInfo = `VOL: ${volume}cbm`;
		}

		if (weight) {
			additonalInfo += ` WT: ${weight}`;
		}

		if (AIR_SERVICES.includes(service_type) && trade_type !== 'domestic') {
			return `${size}${type}${comm} ${packageType} ${packageHandlingType} ${additonalInfo}`;
		}

		if (service_type === 'ftl_freight') {
			return `${size}${type}${truckType}`;
		}

		if (trade_type === 'domestic' && terminal_charge_type && service_type === 'air_freight_local') {
			return `${size}${type}${comm} ${packageType} ${packageHandlingType} ${additonalInfo}`;
		}

		return `${size}${type}${comm}`;
	};

	return [
		...(!isEmpty(line_items)
			? handleLineItems({ items: line_items, source })
			: []),
		{
			features : handleService(),
			price    : !isEmpty(line_items)
				? formatAmount({
					amount   : total_price_discounted,
					currency : total_price_currency,
					options  : {
						notation        : 'standard',
						style           : 'currency',
						currencyDisplay : 'code',
					},
				})
				: 'Local charges will be billed at Actual',
		},
	];
};

export default handleLineItemsBreakup;
