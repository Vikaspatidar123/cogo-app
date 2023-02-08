/* eslint-disable no-undef */
/* eslint-disable import/order */
/* eslint-disable react-hooks/rules-of-hooks */

import { Router } from '@/packages/next';

import pageProgessBar from 'nprogress';
// import './globals.css';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

import SessionCheck from './SessionCheck';
import withStore from './store';

import { Provider } from '@/packages/store';
import { setGeneralStoreState } from '@/packages/store/store/general';
import isMobileAgent from '@/packages/utils/isMobileAgent';
import handleAuthentication from '@/ui/page-components/authentication/utils/handleAuthentication';
import GlobalLayout from '@/ui/page-components/layout/components/GlobalLayout';
// import routeConfig from './routes';

function MyApp({
	Component, pageProps, store, generalData,
}) {
	useEffect(() => {
		Router.events.on('routeChangeStart', () => {
			pageProgessBar.start();
			pageProgessBar.set(0.4);
		});

		Router.events.on('routeChangeComplete', () => {
			pageProgessBar.done();
		});
	}, []);
	useEffect(() => {
		store.dispatch(setGeneralStoreState(generalData));
	}, [generalData]);

	return (
		<Provider store={store}>
			<SessionCheck>
				<GlobalLayout layout={pageProps.layout || 'authenticated'} head={pageProps.head || ''}>
					<Component {...pageProps} />
				</GlobalLayout>
			</SessionCheck>
		</Provider>
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
		// routeConfig,

	};
	const unPrefixedPath = `/${pathname.replace('/[org_id]/[branch_id]/', '')}`;
	const { asPrefix, query: qError } = await handleAuthentication(ctxParams);
	const isMobile = !isServer
		? window.innerWidth < 768
		: isMobileAgent(ctx.req.headers['user-agent'] || '');
	const generalData = {
		pathname,
		asPath,
		unPrefixedPath,
		pathPrefix,
		asPrefix,
		query: { ...query, ...(qError || {}) },
		isServer,
		isMobile,
		locale,
		// routeConfig,
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

export default AppWithStore;
