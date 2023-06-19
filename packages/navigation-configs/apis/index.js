import allocation from './allocation-apis';
import app_settings from './app-settings';
import manageRfq from './manage-rfq-apis';
import saas from './saas';
import search from './search-apis';
import shipment from './shipment-apis';

const apis = {
	search: search.map((api) => ({
		...api,
		module: 'search',
	})),
	shipment: shipment.map((api) => ({
		module  : 'shipment',
		feature : 'shipment',
		...api,
	})),

	app_settings,
	allocation,
	...saas,
	manageRfq,

};
export default apis;
