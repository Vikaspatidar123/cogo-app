import { Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function DiscoverRates() {
	const { push } = useRouter();
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				Start discovering your rates/track your deals
			</div>
			<div className={styles.innerCard}>
				<div className={styles.icon}>
					<IcMSearchlight fill="white" />
				</div>
				<div style={{ width: '92%' }}>
					<div className={styles.text1}>
						Discover Rates
					</div>
					<div className={styles.desc}>
						Don’t miss out on the competitive rates across FCL, LCL, Air and
						Haulage in one place.
					</div>
					<div className={styles.btn}>
						<Button themeType="linkUi" onClick={() => push('/book')}>Go to rates</Button>
					</div>
				</div>
				<div />
			</div>
		</div>
	);
}

export default DiscoverRates;
