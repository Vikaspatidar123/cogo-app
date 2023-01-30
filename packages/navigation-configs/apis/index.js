import allocation from './allocation-apis';
import app_settings from './app-settings';
import common_apis from './common-apis';
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
	...common_apis,

};
export default apis;
