import acceptLanguage from 'accept-language';

import { i18n } from './next-i18next.config';
import generateRedirectionUrl from './ui/helpers/generateRedirectionUrl';
import getUserLocationData from './ui/helpers/getUserLocationData';

const PUBLIC_FILE = /\.(.*)$/;
const LOCALE_COOKIE_KEY = 'locale';
const LOCATION_COOKIE_KEY = 'location';

const languages = i18n.locales.filter((locale) => locale !== 'default');
const countriesCodes = languages.map((lang) => lang.split('-')[1]);
const LOCALE_LOCATION_MAPPING = languages.reduce((pv, cv) => ({
	...pv,
	[cv.split('-')[1]]: cv,
}), { OTHERS: 'default' });

acceptLanguage.languages(languages);

const getCookie = ({ request }) => {
	const cookieLocale = request.cookies.get(LOCALE_COOKIE_KEY)?.value;

	const cookieLocation = request.cookies.get(LOCATION_COOKIE_KEY)?.value;

	return { cookieLocale, cookieLocation };
};

const oldLocale = {
	languages: languages.map((lang) => lang.split('-')[0]), // ['en', 'vi', ...]
	isPresent({ pathname }) {
		return this.languages.some((locale) => pathname.split('/').includes(locale));
	},
};

const getCountryCode = async ({ ip }) => {
	const data = await getUserLocationData({ ip });

	const { countryCode } = data;

	return countryCode;
};

const getLocale = ({ language, countryCode, requestLocale, cookieLocale }) => {
	let locale = 'default';

	if (countriesCodes.includes(countryCode)) {
		locale = LOCALE_LOCATION_MAPPING[countryCode];
	}

	if (requestLocale !== 'default' && languages.includes(requestLocale)) {
		locale = requestLocale;
	}

	if (cookieLocale && languages.includes(cookieLocale)) {
		locale = [cookieLocale, 'default'].includes(requestLocale)
			? cookieLocale
			: requestLocale;
	}

	if (locale === 'default' && languages.includes(language)) {
		locale = language;
	}

	return locale;
};

export const middleware = async (request) => {
	try {
		if (
			PUBLIC_FILE.test(request.nextUrl.pathname)
			|| request.nextUrl.pathname.startsWith('/_next')
			|| request.nextUrl.pathname.includes('/api/')
		) {
			return;
		}

		const isOldLocalePresent = oldLocale.isPresent({ pathname: request.nextUrl.pathname });
		const language = acceptLanguage.get(request.headers.get('accept-language'));

		const { cookieLocale, cookieLocation } = getCookie({ request });

		let countryCode = cookieLocation;
		if (!cookieLocation) {
			let ipAddress = request.headers.get('x-forwarded-for');

			if (ipAddress?.includes(',')) {
				ipAddress = ipAddress?.split(',')?.[0];
			}

			countryCode = await getCountryCode({ ip: ipAddress });
		}

		const locale = getLocale({ language, countryCode, requestLocale: request.nextUrl.locale, cookieLocale });

		if (!cookieLocation || request.nextUrl.locale === 'default' || isOldLocalePresent) {
			const response = generateRedirectionUrl({ request, locale, isOldLocalePresent });
			const cokkieExpiry = new Date();
			cokkieExpiry.setHours(cokkieExpiry.getHours() + 12);

			response.cookies.set(LOCALE_COOKIE_KEY, locale);
			response.cookies.set(LOCATION_COOKIE_KEY, countryCode, { expires: cokkieExpiry });

			// eslint-disable-next-line consistent-return
			return response;
		}

		// eslint-disable-next-line consistent-return
		return;
	} catch (error) {
		console.error('error :: ', error);
	}
};
