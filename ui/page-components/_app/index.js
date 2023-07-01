/* eslint-disable no-undef */
/* eslint-disable import/order */
/* eslint-disable react-hooks/rules-of-hooks */

import { dynamic, Router } from '@/packages/next';
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
import { setCookie, getCookie } from '@cogoport/utils';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getGeoConstants from '@/ui/commons/constants/geo';

const DynamicChatBot = dynamic(() => import('@/ui/commons/components/CogoBot'), {
	ssr: false,
});

function MyApp({ Component, pageProps, store, generalData }) {
	const { profile } = store.getState() || {};
	const { partner_id, id:organizationId } = profile.organization || {};

	let countryCode = '';

	if (typeof document !== 'undefined') {
		countryCode = getCookie('location');
	}

	const geo = getGeoConstants();

	const isUnKnownUser = !organizationId;

	const isBotVisible = isUnKnownUser
		? !(GLOBAL_CONSTANTS.bot_not_visible_countries.includes(countryCode))
		: geo.parent_entity_id !== GLOBAL_CONSTANTS.country_entity_ids.VN;

	useEffect(() => {
		setCookie('parent_entity_id', partner_id);
		setCookie('locale', Router.locale);
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
		<Provider store={store}>
			<GlobalLayout
				layout={pageProps.layout || 'authenticated'}
				head={pageProps.head || ''}
			>
				<Component {...pageProps} />
				{isBotVisible && <DynamicChatBot />}
			</GlobalLayout>
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
