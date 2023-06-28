import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import styles from './styles.module.css';
import Tab from './Tab';

import { useRouter } from '@/packages/next';

function TabsSection() {
	const [css, setCss] = useState('');

	const { push } = useRouter();

	const clickHandler = (val) => {
		setCss(val);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.heading}>Select Type of Insurance: </div>
			<div className={styles.button_wrapper}>
				{['ocean', 'air', 'road'].map((tab) => (
					<Tab
						clickHandler={clickHandler}
						css={css}
						tab={tab}
					/>
				))}
			</div>
			<div className={styles.wrapper_2}>
				<Button
					onClick={() => push('/saas/insurance/[type]', `/saas/insurance/${startCase(css)}`)}
					disabled={css === ''}
				>
					Proceed
				</Button>
			</div>
		</div>
	);
}

export default TabsSection;
