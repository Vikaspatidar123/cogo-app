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
export const urls = {
	loadingUrl : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg',
	emptyUrl   : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ICSad.svg',
};
