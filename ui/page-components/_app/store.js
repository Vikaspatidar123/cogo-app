import {
	createWithStore,
	profileStore,
	searchStore,
} from '@/packages/store';

export default createWithStore(
	{
		profile : profileStore,
		search  : searchStore,
	},
	{ storeKey: '__COGO_APP_STORE__' },
);
