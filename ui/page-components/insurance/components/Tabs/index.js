import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import AirTab from './AirTab';
import OceanTab from './OceanTab';
import styles from './styles.module.css';
import SurfaceTab from './SurfaceTab';

import { useRouter } from '@/packages/next';

function TabsSection({ isMobile }) {
	const [css, setCss] = useState('');

	const { push } = useRouter();

	const clickHandler = (val) => {
		setCss(val);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.heading}>Select Type of Insurance: </div>
			<div className={isMobile ? styles.button_wrapper_mobile : styles.button_wrapper}>
				<OceanTab isMobile={isMobile} clickHandler={clickHandler} css={css} />
				<AirTab isMobile={isMobile} clickHandler={clickHandler} css={css} />
				<SurfaceTab isMobile={isMobile} clickHandler={clickHandler} css={css} />
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
