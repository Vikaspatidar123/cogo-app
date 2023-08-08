import { IcMArrowNext, IcMAir, IcCFcl } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Tracking() {
	const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);

	return (
		<div className={styles.header}>
			<div className={styles.track}>
				<div>
					<p className={styles.trace}>{t('dashboard:common_trackTraceHeader_text_1')}</p>
				</div>

			</div>
			<div
				className={styles.cargo}
				role="presentation"
				onClick={() => push('/saas/tools/air-ocean-tracking?activeTab=air')}
			>
				<div className={styles.symbol}>
					<IcMAir width={18} height={18} />

				</div>
				<div>
					<p className={styles.symbols}>
						{t('dashboard:tracknTrace_card_text_1')}
						<IcMArrowNext className={styles.arrow} />
					</p>
					<p className={styles.bill}>{t('dashboard:tracknTrace_card_text_2')}</p>
				</div>

			</div>
			<div
				className={styles.container}
				role="presentation"
				onClick={() => push('/saas/tools/air-ocean-tracking?activeTab=ocean')}
			>
				<div className={styles.container_img}>
					<IcCFcl width={18} height={18} />
				</div>
				<div>
					<p className={styles.containerTracking}>
						{t('dashboard:tracknTrace_card_text_3')}
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
