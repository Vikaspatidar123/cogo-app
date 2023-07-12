import {
	IcAWarehouseLoadingDock,
	IcMManufacturing,
	IcAWarehouse,
} from '@cogoport/icons-react';

export const dimensions = {
	0 : ['310px', 'auto'],
	1 : ['340px', 'auto'],
	2 : ['340px', 'auto'],
	3 : ['250px', '270px'],
};

export const OPTIONS = [
	{
		label : 'Factory',
		value : 'factory',
	},
	{
		label : 'Office',
		value : 'office',
	},
	{
		label : 'Ware House',
		value : 'warehouse',
	},
];

export const Icons = {
	warehouse : <IcAWarehouseLoadingDock width={30} height={30} />,
	office    : <IcAWarehouse width={30} height={30} />,
	factory   : <IcMManufacturing width={30} height={30} />,
};

export const MOST_POPPULAR_INDEX = 2;

export const EXPIRE_DAY = 0;

export const MIN_POPPULAR_SEQUENCE = 0;

export const CLOSE_TIME = 9;

export const PAINTING_TIME = 10;

export const SET_TIME = 10000;

export const DEFAULT_DURATION_VALUE = 25;

export const DEFAULT_VALUE = 0;

export const API_COUNT_TIME = 10;

export const START_COUNT = 1;

export const CURRENT_USER_VALUE = 4;

export const PERCENTAGE_COUNT = 20;

export const SCROLL_VALUE = 820;

export const SET_DURATION = 100;

export const MAX_VALUE = 100;

export const MIN_VALUE = 1;

export const SLIDER_LABEL = ['1', '25', '50', '75', '100'];

export const calculatePercentage = (count, addon, total) => {
	const totalCount = +total + +addon;
	const leftCount = +count + +addon;
	const percentage = (+leftCount * 100) / +totalCount;
	return percentage < PERCENTAGE_COUNT;
};
