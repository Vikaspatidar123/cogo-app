import { IcCFtick } from '@cogoport/icons-react';
import { startCase, upperCase } from '@cogoport/utils';

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

export const LOADING_TEXT = [
	'Tracking your shipment in real-time...',
	'Monitoring the progress of your shipment...',
	'Tracking the movement of your shipment for detailed updates...',
	'Fetching the latest tracking information for your package...',
];

export const LOADING_TEXT_COUNT = 3;

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
	const valueForInput = Array.isArray(packages) && packages?.length > 0 ? packages[0] : null;

	const inputValue = valueForInput
		? `${valueForInput.packages_count}
		 ${t('dashboard:common_containerInfo_inputValue')},
		  ${valueForInput?.length} X ${valueForInput?.width} X ${valueForInput?.height}, ${valueForInput?.packing_type}`
		: '';
	const packageDetails = `${t('dashboard:common_containerInfo_packageDetails_1')}:
	 ${inputValue} ${packages?.length > 1
	? `+ ${(packages?.length || 0) - 1} ${t('dashboard:common_containerInfo_packageDetails_2')}`
	: ''
}`;

	switch (label) {
		case 'container_size':
			if (data.container_size?.includes('HC')) {
				return data.container_size?.replace('HC', 'ft HC');
			}
			return `${data.container_size || '--'}ft`;
		case 'containers_count':
			if (!data.containers_count) {
				return null;
			}

			if (data.containers_count === 1) {
				return t('dashboard:common_containerInfo_renderValue_2');
			}

			return `${data.containers_count} ${t('dashboard:common_containerInfo_renderValue_3')}`;
		case 'packages_count':
			if (!data.packages_count) {
				return null;
			}

			if (data.packages_count === 1) {
				return t('dashboard:common_containerInfo_renderValue_4');
			}

			return `${data.packages_count} "${t('dashboard:common_containerInfo_renderValue_5')}"`;
		case 'trucks_count':
			if (!data.trucks_count) {
				return null;
			}

			if (data.trucks_count === 1) {
				return t('dashboard:common_containerInfo_renderValue_6');
			}

			return `${data.trucks_count} t('dashboard:common_containerInfo_renderValue_7')`;
		case 'container_type':
			return startCase(data.container_type || '');
		case 'trade_type':
			return startCase(data.trade_type || '');
		case 'commodity':
			return startCase(data.commodity || '');
		case 'inco_term':
			return `${t('dashboard:common_containerInfo_renderValue_8')} - ${upperCase(data.inco_term || '')}`;
		case 'packages':
			if (packages?.length === 0) {
				return null;
			}
			return packageDetails;
		case 'volume':
			return `${t('dashboard:common_containerInfo_renderValue_9')}. - ${data.volume
			} ${t('dashboard:common_containerInfo_renderValue_10')}`;
		case 'weight':
			return `${t('dashboard:common_containerInfo_renderValue_11')}. - ${data.weight
			} ${t('dashboard:common_containerInfo_renderValue_12')}`;
		case 'haulage_type':
			return startCase(data.haulage_type || '');
		case 'transport_mode':
			return startCase(data.transport_mode || '');
		case 'cargo_stacking_type':
			return startCase(data.cargo_stacking_type || '');
		case 'msds_document':
			return data.commodity_details?.[0].msds_document ? `msds${(<IcCFtick />)}` : null;
		default:
			return null;
	}
};

export const OTHERPARAMS = {
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
