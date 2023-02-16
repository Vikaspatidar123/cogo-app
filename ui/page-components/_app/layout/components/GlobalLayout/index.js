import {
	useRef, useState, useMemo, useEffect,
} from 'react';

import { useSelector, useDispatch } from '../../../../../../packages/store';
import { setGeneralStoreState as setGeneralState } from '../../../../../../packages/store/store/general';
import AppLayout from '../AppLayout';

import styles from './styles.module.css';

import { Head } from '@/packages/next';
import { useWindowDimensions } from '@/ui/commons/utils/getMobailView';

function GlobalLayout({
	children, layout, head, hideBG, ...rest
}) {
	const elementRef = useRef(null);
	const {
		info,
	} = useSelector(({ general }) => ({
		info: general || {},
	}));
	const dispatch = useDispatch();
	const [isMobile, setIsMobile] = useState(false);
	const { width } = useWindowDimensions();
	useEffect(() => {
		if (width < 1192) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [width]);

	useEffect(() => {
		dispatch(setGeneralState({ ...info, isMobile }));
	}, [isMobile]);

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
