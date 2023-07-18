import allocation from './allocation-apis';
import app_contract_management from './app-manage-contract-apis';
import app_settings from './app-settings';
import chat_bot_apis from './chat-bot-apis';
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
	app_contract_management,
	chat_bot_apis,

};
export default apis;
