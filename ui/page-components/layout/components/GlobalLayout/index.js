// import { Grid } from '@cogoport/components';
import { Head } from 'next/document';
import { useRef, useEffect } from 'react';

import { useSelector, useDispatch } from '../../../../../packages/store';
import { setGeneralState as setGeneralStoreState } from '../../../../../packages/store/store/general';
import AppLayout from '../AppLayout';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

// const { useScreenClass } = Grid;

function GlobalLayout({
	children, layout, head, hideBG, ...rest
}) {
	const elementRef = useRef(null);
	const dispatch = useDispatch();
	const generalData = useSelector(({ general }) => general);
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
					<title>{title}</title>
				</Head>
			)}

			{getBody()}
		</div>
	);
}

export default GlobalLayout;
