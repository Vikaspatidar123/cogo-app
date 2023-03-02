import {
	Html, Head, Main, NextScript,
} from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap"
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
				{/* <meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta name="theme-color" content="#ffffff" /> */}
				<link rel="manifest" href="/manifest.json" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
