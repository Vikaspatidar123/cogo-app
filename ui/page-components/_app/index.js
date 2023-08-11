/* eslint-disable no-undef */
import { setCookie, getCookie } from '@cogoport/utils';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import pageProgessBar from 'nprogress';
import { useEffect } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import withStore from './store';

import { routeConfig } from '@/packages/navigation-configs';
import { dynamic, Router } from '@/packages/next';
import 'nprogress/nprogress.css';
import { Provider } from '@/packages/store';
import { setGeneralStoreState } from '@/packages/store/store/general';
import getGeoConstants from '@/ui/commons/constants/geo';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import GlobalLayout from '@/ui/page-components/_app/layout/components/GlobalLayout';
import handleAuthentication from '@/ui/page-components/authentication/utils/handleAuthentication';

const KEY_MAPPING = {
	COUNTRY: {
		IN: {
			isBotVisible: true,
		},
		VN: {
			isBotVisible: false,
		},
		SG: {
			isBotVisible: false,
		},
	},
	ENTITY: {
		[GLOBAL_CONSTANTS.country_entity_ids.IN]: {
			isBotVisible: true,
		},
		[GLOBAL_CONSTANTS.country_entity_ids.VN]: {
			isBotVisible: false,
		},
		[GLOBAL_CONSTANTS.country_entity_ids.SG]: {
			isBotVisible: false,
		},
	},
};

const DynamicChatBot = dynamic(() => import('@/ui/commons/components/CogoBot'), {
	ssr: false,
});

function MyApp({ Component, pageProps, store, generalData }) {
	const { profile } = store.getState() || {};
	const { partner_id, id: organizationId } = profile.organization || {};
	const queryClient = new QueryClient();

	const router = useRouter();

	const { locale } = router;

	let countryCode = '';

	if (typeof document !== 'undefined') {
		countryCode = getCookie('location');
	}

	const geo = getGeoConstants();

	const isUnKnownUser = !organizationId;

	const botVisibility = isUnKnownUser
		? KEY_MAPPING.COUNTRY[countryCode]
		: KEY_MAPPING.ENTITY[geo.parent_entity_id];

	const { isBotVisible = true } = botVisibility || {};

	useEffect(() => {
		setCookie('locale', locale);
	}, [locale]);

	useEffect(() => {
		setCookie('parent_entity_id', partner_id);
		Router.events.on('routeChangeStart', () => {
			pageProgessBar.start();
			pageProgessBar.set(0.4);
		});

		Router.events.on('routeChangeComplete', () => {
			pageProgessBar.done();
		});
		store.dispatch(setGeneralStoreState(generalData));
	}, [generalData, store, partner_id]);

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<GlobalLayout
					layout={pageProps.layout || 'authenticated'}
					head={pageProps.head || ''}
				>
					<Component {...pageProps} />
					{isBotVisible && <DynamicChatBot />}
				</GlobalLayout>
			</Provider>
			{process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const {
		store, req, pathname, asPath, query = {}, locale,
	} = ctx;
	const isServer = typeof req !== 'undefined';
	// const isToken = isServer ? req.headers.cookie : false;
	const pathPrefix = '/[org_id]/[branch_id]';
	const ctxParams = {
		...ctx,
		isServer,
		routeConfig,
	};
	const unPrefixedPath = `/${pathname.replace('/[org_id]/[branch_id]/', '')}`;
	const { asPrefix, query: qError } = await handleAuthentication(ctxParams);

	const generalData = {
		pathname,
		asPath,
		unPrefixedPath,
		pathPrefix,
		asPrefix,
		query: { ...query, ...(qError || {}) },
		isServer,
		locale,
		routeConfig,
	};

	await store.dispatch(setGeneralStoreState(generalData));

	const initialProps = Component.getInitialProps
		? await Component.getInitialProps(ctxParams)
		: {};

	return {
		pageProps: initialProps,
		generalData,
		store,
	};
};

const AppWithStore = withStore(MyApp);

export default appWithTranslation(AppWithStore);
