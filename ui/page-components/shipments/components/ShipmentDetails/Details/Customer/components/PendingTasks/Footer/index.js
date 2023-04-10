import { IcMArrowNext } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Footer({ activeIndex, onClick, pendingTaskTotal }) {
	const leftIndex = activeIndex === 0;
	const rightIndex = activeIndex + 1 === pendingTaskTotal;

	return (
		<div className={styles.container}>
			<IcMArrowNext
				onClick={() => (activeIndex > 0 ? onClick(activeIndex - 1) : null)}
				style={{
					transform : 'rotate(180deg)',
					cursor    : leftIndex ? 'not-allowed' : 'pointer',
					opacity   : leftIndex ? '0.5' : '',
				}}
			/>

			<div className={styles.steps}>
				{activeIndex + 1}
				{' '}
				/
				{pendingTaskTotal}
			</div>

			<IcMArrowNext
				onClick={() => (activeIndex < pendingTaskTotal - 1 ? onClick(activeIndex + 1) : null)}
				style={{
					cursor  : rightIndex ? 'not-allowed' : 'pointer',
					opacity : rightIndex ? '0.5' : '',
				}}
			/>
		</div>
	);
}

export default Footer;
