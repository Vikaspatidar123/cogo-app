// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { init } from '@sentry/nextjs';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const IS_PROD = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

if (IS_PROD && SENTRY_DSN) {
	init({
		dsn              : SENTRY_DSN,
		environment      : process.env.NEXT_PUBLIC_NODE_ENV,
		// Adjust this value in production, or use tracesSampler for greater control
		tracesSampleRate : 1.0,
		// tracesSampleRate: IS_PROD ? 0.2 : 1.0,
		// ...
		// Note: if you want to override the automatic release value, do not set a
		// `release` value here - use the environment variable `SENTRY_RELEASE`, so
		// that it will also get attached to your source maps
	});
}
