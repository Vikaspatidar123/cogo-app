import { IcMArrowNext } from '@cogoport/icons-react';

// import GetTracking from '../../hooks/GetTracking';

import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Tracking() {
	// const { loading, schedulesData, air_track } = GetTracking();
	const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);

	return (
		<div className={styles.header}>
			<div className={styles.track}>
				<div>
					<p className={styles.trace}>{t('dashboard:common_trackTraceHeader_text_1')}</p>
				</div>

			</div>
			<div className={styles.cargo} role="presentation" onClick={() => push('/saas/air-tracking')}>
				<div className={styles.symbol}>
					<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/air.svg" alt="img" />

				</div>
				<div>
					<p className={styles.symbols}>
						{t('dashboard:tracknTrace_card_text_1')}
						{/* <img
							className={styles.arrow}
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/another.svg"
							alt="img"
						/> */}
						<IcMArrowNext className={styles.arrow} />

					</p>
					<p className={styles.bill}>{t('dashboard:tracknTrace_card_text_2')}</p>
				</div>

			</div>
			<div className={styles.container} role="presentation" onClick={() => push('/saas/ocean-tracking')}>
				<div className={styles.container_img}>
					<img
						src="	https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/containerIcon_new.svg"
						alt="img"
					/>
				</div>
				<div>
					<p className={styles.containerTracking}>
						{t('dashboard:tracknTrace_card_text_3')}
						<img
							className={styles.arrow}
							src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/another.svg"
							alt="img"
						/>
						<IcMArrowNext className={styles.arrow} />
					</p>
					<p
						className={styles.Trace}
					>
						{t('dashboard:tracknTrace_card_text_4')}

					</p>
				</div>
			</div>
		</div>
	);
}
export default Tracking;
