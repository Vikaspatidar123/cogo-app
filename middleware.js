/* eslint-disable no-console */
import acceptLanguage from 'accept-language';
import { NextResponse } from 'next/server';

import { i18n } from './next-i18next.config';

const PUBLIC_FILE = /\.(.*)$/;
const DEFAULT_LOCALE = 'en-IN';
const LOCALE_COOKIE_KEY = 'locale';

const languages = i18n.locales.filter((locale) => locale !== 'default');

acceptLanguage.languages(languages);

export const middleware = async (request) => {
	try {
		if (
			PUBLIC_FILE.test(request.nextUrl.pathname)
			|| request.nextUrl.pathname.startsWith('/_next')
			|| request.nextUrl.pathname.includes('/api/')
		) {
			return;
		}

		let cookieLocale = request.cookies.get(LOCALE_COOKIE_KEY)?.value;
		if (cookieLocale && !languages.includes(cookieLocale)) {
			const cookieLocaleLanguage = cookieLocale.split('-')?.[0];

			cookieLocale = languages.includes(cookieLocaleLanguage)
				? cookieLocaleLanguage
				: undefined;
		}

		if (request.nextUrl.locale === 'default') {
			const language = acceptLanguage.get(
				request.headers.get('accept-language'),
			);

			const locale = cookieLocale || language || DEFAULT_LOCALE;

			const url = `/${locale}${request.nextUrl.pathname}${request.nextUrl.search}`;
			const urlObj = new URL(url, request.url);

			const response = NextResponse.redirect(urlObj);

			response.cookies.set(LOCALE_COOKIE_KEY, locale);

			// eslint-disable-next-line consistent-return
			return response;
		}

		if (request.headers.has('referer')) {
			if (cookieLocale !== request.nextUrl.locale) {
				const response = NextResponse.next();

				response.cookies.set(LOCALE_COOKIE_KEY, request.nextUrl.locale);

				// eslint-disable-next-line consistent-return
				return response;
			}
		} else {
			// eslint-disable-next-line no-lonely-if
			if (!cookieLocale || cookieLocale !== request.nextUrl.locale) {
				const url = `/${request.nextUrl.locale}${request.nextUrl.pathname}${request.nextUrl.search}`;

				const urlObj = new URL(url, request.url);

				const response = NextResponse.redirect(urlObj);

				response.cookies.set(LOCALE_COOKIE_KEY, request.nextUrl.locale);

				// eslint-disable-next-line consistent-return
				return response;
			}
		}

		return;
	} catch (error) {
		console.log(error);
	}
};
