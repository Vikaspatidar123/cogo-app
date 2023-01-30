/* eslint-disable react-hooks/rules-of-hooks */
import '@cogoport/components/dist/themes/base.css';
import '@cogoport/components/dist/themes/dawn.css';

// import { appWithTranslation } from 'next-i18next';
import pageProgessBar from 'nprogress';
// import './globals.css';
import 'nprogress/nprogress.css';

import { useEffect } from 'react';

import getUserData from '../authentication/hooks/getUserData';

import SessionCheck from './SessionCheck';
import withStore from './store';

import GlobalLayout from '@/ui/page-components/layout/components/GlobalLayout';
import { Router } from '@/packages/next';
import { Provider } from '@/packages/store';
import { setGeneralStoreState } from '@/packages/store/store/general';
import isMobileAgent from '@/packages/utils/isMobileAgent';

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
				<GlobalLayout layout={pageProps.layout || 'authenticated'}>
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
	const { profile } = (store.getState((s) => s));

	const isServer = typeof req !== 'undefined';
	const isToken = isServer ? req.headers.cookie : false;
	const pathPrefix = '/[org_id]';
	const ctxParams = {
		ctx,
		isServer,
		pathPrefix,
		store,
		pathname,
		req,
		isToken,
		// asPath: modifiedAsPath,
	};
	const unPrefixedPath = `/${pathname.replace('/[org_id]/', '')}`;

	if (Object.keys(profile).length === 0 && isToken) {
		await getUserData({ store, isServer, req });
	}
	const isMobile = !isServer
		? window.innerWidth < 768
		: isMobileAgent(ctx.req.headers['user-agent'] || '');
	const generalData = {
		pathname,
		asPath,
		unPrefixedPath,
		pathPrefix,
		// asPrefix,
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
		pathname,
		asPath,
		query,
		isServer,
		generalData,
		store,
	};
};

const AppWithStore = withStore(MyApp);

export default AppWithStore;
