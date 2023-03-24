import allocation from './allocation-apis';
import app_settings from './app-settings';
import manageRfq from './manage-rfq-apis';
import saas from './saas';
import search from './search-apis';

const apis = {
	search: search.map((api) => ({
		...api,
		module: 'search',
	})),

	app_settings,
	allocation,
	...saas,
	manageRfq,

};
export default apis;
