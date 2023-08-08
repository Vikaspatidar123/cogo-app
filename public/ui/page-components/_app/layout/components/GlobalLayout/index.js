import {
	useRef,
} from 'react';

import AppLayout from '../AppLayout';

import styles from './styles.module.css';

import HIDE_LAYOUT from '@/packages/navigation-configs/config/hide-layout';
import { Head, useRouter } from '@/packages/next';

function GlobalLayout({
	children, layout, head, ...rest
}) {
	const elementRef = useRef(null);

	const { pathname } = useRouter();

	const layoutShow = HIDE_LAYOUT.includes(pathname);
	const getBody = () => {
		if (!layoutShow) {
			return <AppLayout {...rest}>{children}</AppLayout>;
		}

		return children;
	};

	return (
		<div
			ref={elementRef}
			className={styles.page_bg}
		>

			<Head>
				<title>
					Cogoport App
				</title>
			</Head>

			{getBody()}
		</div>
	);
}

export default GlobalLayout;
