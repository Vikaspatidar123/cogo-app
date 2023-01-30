import {
	createWithStore,
	profileStore,
} from '@/packages/store';

export default createWithStore(
	{
		profile: profileStore,

	},
	{ storeKey: '__COGO_APP_STORE__' },
);
