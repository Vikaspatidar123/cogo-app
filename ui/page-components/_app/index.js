/* eslint-disable no-undef */
/* eslint-disable import/order */
/* eslint-disable react-hooks/rules-of-hooks */

import { Router } from '@/packages/next';
import { appWithTranslation } from 'next-i18next';
import pageProgessBar from 'nprogress';
import { useEffect } from 'react';

import withStore from './store';

import { routeConfig } from '@/packages/navigation-configs';

import 'nprogress/nprogress.css';
import { Provider } from '@/packages/store';
import { setGeneralStoreState } from '@/packages/store/store/general';
import GlobalLayout from '@/ui/page-components/_app/layout/components/GlobalLayout';
import handleAuthentication from '@/ui/page-components/authentication/utils/handleAuthentication';

function MyApp({ Component, pageProps, store }) {
	useEffect(() => {
		Router.events.on('routeChangeStart', () => {
			pageProgessBar.start();
			pageProgessBar.set(0.4);
		});

		Router.events.on('routeChangeComplete', () => {
			pageProgessBar.done();
		});
	}, []);

	return (
		<Provider store={store}>
			<GlobalLayout
				layout={pageProps.layout || 'authenticated'}
				head={pageProps.head || ''}
			>
				<Component {...pageProps} />
			</GlobalLayout>
		</Provider>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const { store, req, pathname, asPath, query = {}, locale } = ctx;
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
