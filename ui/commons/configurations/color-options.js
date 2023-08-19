import {
	IcMHaulage,
	IcMTrailorFull, IcMAirport, IcMShip, IcMSchedules,
} from '@cogoport/icons-react';

import location_type_mapping from './location_type_mapping';

const iconStyle = {
	background     : '#fff',
	border         : 'none',
	padding        : '4px',
	fontSize       : '12px',
	fontWeight     : '500',
	display        : 'flex',
	alignItems     : 'center',
	justifyContent : 'center',
};

export const colorMappings = {
	ocean   : '#1867D2',
	land    : '#136f29',
	air     : '#f37166',
	road    : '#136f29',
	haulage : '#8B0000',
};

export const portMappings = {
	seaport : 'ocean',
	airport : 'air',
	road    : 'land',
};

const icons = Object.entries(location_type_mapping)
	.reduce((acc, [key, val]) => {
		acc[key] = val.icon;
		return acc;
	}, {});

export const iconMappings = {
	...icons,
	all     : <IcMSchedules />,
	sea     : <IcMShip />,
	ocean   : <IcMShip />,
	seaport : <IcMShip />,
	air     : <IcMAirport />,
	airport : <IcMAirport />,
	land    : <IcMTrailorFull />,
	road    : <IcMTrailorFull />,
	haulage : <IcMHaulage />,
	icd     : <button style={iconStyle}>ICD</button>,
};

export const alternatePathOptions = (isMoving = false, service = '') => ({
	color   : service === 'haulage' ? '#136f29' : '#ffffff',
	weight  : 4,
	opacity : isMoving ? 0 : 1,
});

export const servicePathOptions = (service = 'land', isMoving = false) => ({
	color     : service === 'haulage' ? '#fff' : colorMappings[service],
	weight    : 3,
	opacity   : isMoving ? 0 : 1,
	dashArray : service === 'haulage' ? '8 5 8 5' : '',
	lineCap   : service === 'haulage' ? 'butt' : 'round',
});

export const serviceMarkerOptions = (type = 'land', main_service = 'ocean') => ({
	fillColor   : colorMappings[type] || colorMappings[portMappings[type]],
	color       : '#f6f7f9',
	weight      : 2,
	radius      : (portMappings[type] === main_service || type === main_service) ? 5.5 : 5,
	fillOpacity : 0.95,
});

export const tabOptions = [
	{ label: 'Suggested', value: 'all' },
	{ label: 'Sea', value: 'sea' },
	{ label: 'Air', value: 'air' },
];
