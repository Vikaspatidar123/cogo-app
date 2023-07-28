import { IcCFtick } from '@cogoport/icons-react';
import { isEmpty, startCase, upperCase } from '@cogoport/utils';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

export const airValueKeys = {
	cubic_metre : 'CBM',
	cubic_centi : 'CC',
	cubic_feet  : 'CFT',
	kilogram    : 'KG',
	pounds      : 'LB',
	pallet      : 'Pallet',
	box         : 'Box',
	crate       : 'Crate',
	loose       : 'Loose',
};

export const seaValueKeys = {
	fcl    : 'FCL',
	lcl    : 'LCL',
	20     : '20FT',
	40     : '40FT',
	'40HC' : '40FT HC',
	'45HC' : '45FT HC',
};

export const MAX_LIMIT = 3;

export const PATH_OPTION = {
	ocean : { color: '#1867D2', weight: 2 },
	air   : { color: '#f37166', weight: 2 },
	land  : { color: '#136f29', weight: 2 },
};

export const LOADING_TEXT_COUNT = 3;

export const MORANING_TIME = 12;
export const NOON_TIME = 16;
export const EVENING_TIME = 19;

export const SUFFIX = {
	fcl_freight     : 'port',
	lcl_freight     : 'port',
	air_freight     : 'airport',
	ftl_freight     : 'location',
	ltl_freight     : 'location',
	haulage_freight : 'location',
	trailer_freight : 'location',
};
export const LABELS = [
	'container_size',
	'containers_count',
	'container_type',
	'commodity',
	'inco_term',
	'trucks_count',
	'trade_type',
	'packages',
	'volume',
	'weight',
	'haulage_type',
	'transport_mode',
	'cargo_stacking_type',
	'msds_document',
];

export const renderValue = ({ label, data, t }) => {
	const { packages } = data || {};
	const valueForInput = Array.isArray(packages) && !isEmpty(packages)
		? packages[GLOBAL_CONSTANTS.zeroth_index] : null;

	const inputValue = valueForInput
		? `${valueForInput.packages_count}
		 ${t('dashboard:common_containerInfo_inputValue')},
		  ${valueForInput?.length} X ${valueForInput?.width} X ${valueForInput?.height}, ${valueForInput?.packing_type}`
		: '';

	const packageDetails = `${t('dashboard:common_containerInfo_packageDetails_1')}:
	 ${inputValue} ${packages?.length > 1
	? `+ ${(packages?.length || 0) - 1} ${t('dashboard:common_containerInfo_packageDetails_2')}`
	: ''}`;

	const renderValueMapping = {
		container_size: () => {
			if (data.container_size?.includes('HC')) {
				return data.container_size?.replace('HC', 'ft HC');
			}
			return `${data.container_size || '--'}ft`;
		},
		containers_count: () => {
			if (!data.containers_count) {
				return null;
			}
			if (data.containers_count === 1) {
				return t('dashboard:common_containerInfo_renderValue_2');
			}
			return `${data.containers_count} ${t('dashboard:common_containerInfo_renderValue_3')}`;
		},
		packages_count: () => {
			if (!data.packages_count) {
				return null;
			}
			if (data.packages_count === 1) {
				return t('dashboard:common_containerInfo_renderValue_4');
			}
			return `${data.packages_count} "${t('dashboard:common_containerInfo_renderValue_5')}"`;
		},
		trucks_count: () => {
			if (!data.trucks_count) {
				return null;
			}
			if (data.trucks_count === 1) {
				return t('dashboard:common_containerInfo_renderValue_6');
			}
			return `${data.trucks_count} ${t('dashboard:common_containerInfo_renderValue_7')}`;
		},
		container_type : () => startCase(data.container_type || ''),
		trade_type     : () => startCase(data.trade_type || ''),
		commodity      : () => startCase(data.commodity || ''),
		inco_term      : () => `${t('dashboard:common_containerInfo_renderValue_8')} -
		${upperCase(data.inco_term || '')}`,
		packages : () => (packages?.length === 0 ? null : packageDetails),
		volume   : () => `${t('dashboard:common_containerInfo_renderValue_9')}. -
		 ${data.volume} ${t('dashboard:common_containerInfo_renderValue_10')}`,
		weight: () => `${t('dashboard:common_containerInfo_renderValue_11')}.
		 - ${data.weight} ${t('dashboard:common_containerInfo_renderValue_12')}`,
		haulage_type        : () => startCase(data.haulage_type || ''),
		transport_mode      : () => startCase(data.transport_mode || ''),
		cargo_stacking_type : () => startCase(data.cargo_stacking_type || ''),
		msds_document       : () => (data.commodity_details?.[0].msds_document ? `msds${(<IcCFtick />)}` : null),
	};

	const result = renderValueMapping[label]?.();
	return result || null;
};

export const OTHER_PARAMS = {
	fcl_freight     : ['origin_port_id', 'destination_port_id'],
	lcl_freight     : ['origin_port_id', 'destination_port_id', 'inco_term'],
	air_freight     : ['origin_airport_id', 'destination_airport_id', 'inco_term'],
	trailer_freight : [
		'origin_location_id',
		'destination_location_id',
		'haulage_type',
		'transport_mode',
		'shipping_line_id',
	],
	ftl_freight     : ['origin_location_id', 'destination_location_id'],
	ltl_freight     : ['origin_location_id', 'destination_location_id'],
	fcl_customs     : ['port_id'],
	lcl_customs     : ['trade_type', 'packages_count', 'location_id'],
	air_customs     : ['trade_type', 'packages_count', 'airport_id'],
	haulage_freight : [
		'origin_location_id',
		'destination_location_id',
		'haulage_type',
		'transport_mode',
		'shipping_line_id',
	],
};
