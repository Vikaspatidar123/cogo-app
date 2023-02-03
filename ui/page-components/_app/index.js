/* eslint-disable react-hooks/rules-of-hooks */
import '@cogoport/components/dist/themes/base.css';
import '@cogoport/components/dist/themes/dawn.css';
import { RoutesProvider, Router } from '@/packages/next';

// import { appWithTranslation } from 'next-i18next';
import pageProgessBar from 'nprogress';
// import './globals.css';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

import getUserData from '../authentication/hooks/getUserData';

import SessionCheck from './SessionCheck';
import withStore from './store';

import { Provider } from '@/packages/store';
import { setGeneralStoreState } from '@/packages/store/store/general';
import isMobileAgent from '@/packages/utils/isMobileAgent';
import handleAuthentication from '@/ui/page-components/authentication/utils/handleAuthentication';
import GlobalLayout from '@/ui/page-components/layout/components/GlobalLayout';

function MyApp({
	Component, pageProps, store, generalData
}) {
	const { general, profile } = store.getState() || {};

	console.log(generalData, 'generalData')
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
			<SessionCheck >
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
	console.log(query, 'queryquery', ctx)
	const { profile, general } = (store.getState((s) => s));
	const isServer = typeof req !== 'undefined';
	const isToken = isServer ? req.headers.cookie : false;
	const pathPrefix = '/[org_id]';
	const ctxParams = {
		...ctx,
		isServer
	};
	const unPrefixedPath = `/${pathname.replace('/[org_id]/', '')}`;
	const { asPrefix } = await handleAuthentication({
		...ctx,
		isServer
	});

	const isMobile = !isServer
		? window.innerWidth < 768
		: isMobileAgent(ctx.req.headers['user-agent'] || '');
	const generalData = {
		pathname,
		asPath,
		unPrefixedPath,
		pathPrefix,
		asPrefix,
		scope: 'app',
		query: { ...query },
		isServer,
		isMobile,
		locale,
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
