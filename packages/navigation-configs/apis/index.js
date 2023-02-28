import allocation from './allocation-apis';
import app_settings from './app-settings';
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

};
export default apis;
