import {
	Html, Head, Main, NextScript,
} from 'next/document';

import i18nextConfig from '../../../next-i18next.config';

import { GTM, LinkedinTags } from '@/ui/commons/constants/analytics';

export default function Document(props) {
	const { __NEXT_DATA__ } = props;
	const currentLocale = __NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;
	return (
		<Html lang={currentLocale}>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link
					href={`https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,
					900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap`}
					rel="stylesheet"
				/>
				<link rel="shortcut icon" href="/favicon-32x32.png" />
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/manifest.json" />
				{process.env.NEXT_PUBLIC_APP_GTM_ID && (
					<GTM gtmId={process.env.NEXT_PUBLIC_APP_GTM_ID} />
				)}
			</Head>
			<body>
				<Main />
				<NextScript />
				{process.env.NEXT_PUBLIC_APP_GTM_ID && (
					<GTM.NoScript gtmId={process.env.NEXT_PUBLIC_APP_GTM_ID} />
				)}
				{process.env.APP_LINKEDIN_PARTNER_ID && (
					<LinkedinTags
						linkedInPartnerId={process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}
					/>
				)}
			</body>
		</Html>
	);
}
