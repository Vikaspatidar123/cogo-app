// import { Grid } from '@cogoport/components';
import { useRef, useEffect } from 'react';

import { useSelector, useDispatch } from '../../../../../packages/store';
import { setGeneralState as setGeneralStoreState } from '../../../../../packages/store/store/general';
import AppLayout from '../AppLayout';

import styles from './styles.module.css';

import { Head } from '@/packages/next';

// const { useScreenClass } = Grid;

function GlobalLayout({
	children, layout, head, hideBG, ...rest
}) {
	const elementRef = useRef(null);
	// const screenClass = useScreenClass(elementRef);
	// const isMobile = ['xs', 'sm'].includes(screenClass);

	// useEffect(() => {
	// 	dispatch(setGeneralStoreState({ ...generalData }));
	// }, []);

	const getBody = () => {
		if (layout === 'app') {
			return <AppLayout {...rest}>{children}</AppLayout>;
		}

		return children;
	};

	const { title } = head || {};
	return (
		<div
			ref={elementRef}
			// className={hideBG ? '' : 'page-bg'}
			className={hideBG ? styles.component : styles.page_bg}
		>
			{title && (
				<Head>
					<title>
						Cogoport App |
						{title}
					</title>
					<link rel="icon" href="/favicon.ico" />
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
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<meta name="theme-color" content="#ffffff" />
					<link rel="manifest" href="/manifest.json" />
				</Head>

			)}

			{getBody()}
		</div>
	);
}

export default GlobalLayout;
