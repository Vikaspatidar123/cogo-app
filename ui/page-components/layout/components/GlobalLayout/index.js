// import { Grid } from '@cogoport/components';
import {
	useRef, useState, useMemo,
} from 'react';

import { useSelector, useDispatch } from '../../../../../packages/store';
import { setGeneralStoreState as setGeneralState } from '../../../../../packages/store/store/general';
import AppLayout from '../AppLayout';

import styles from './styles.module.css';

// import { useWindowDimensions } from '@/commons/utils/getMobailView';
import { Head } from '@/packages/next';

function GlobalLayout({
	children, layout, head, hideBG, ...rest
}) {
	const elementRef = useRef(null);
	// const { general } = useSelector((s) => s);
	// const [isMobile, setIsMobile] = useState(false);
	// const { width } = useWindowDimensions();
	// const dispatch = useDispatch();
	// useEffect(() => {
	// 	if (width < 1154) {
	// 		setIsMobile(true);
	// 	} else {
	// 		setIsMobile(false);
	// 	}
	// }, [width]);
	// useMemo(() => {
	// 	dispatch(setGeneralState({ isMobile, ...general }));
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
					<link rel="icon" href="/v2/favicon.ico" />
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/v2/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/v2/favicon-16x16.png"
					/>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<meta name="theme-color" content="#ffffff" />
					<link rel="manifest" href="/v2/manifest.json" />
				</Head>

			)}

			{getBody()}
		</div>
	);
}

export default GlobalLayout;
