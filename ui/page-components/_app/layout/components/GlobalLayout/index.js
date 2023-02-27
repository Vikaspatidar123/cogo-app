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
				</Head>

			)}

			{getBody()}
		</div>
	);
}

export default GlobalLayout;
