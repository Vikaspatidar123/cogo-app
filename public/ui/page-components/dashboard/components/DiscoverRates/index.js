import { IcMArrowNext, IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function DiscoverRates() {
	const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);

	const handelRouting = () => {
		push('/book');
	};

	return (
		<div className={styles.container}>
			<div className={styles.text}>
				{t('dashboard:yourDeals_text_1')}
			</div>

			<div className={styles.display_container}>
				<div className={styles.innerCard}>
					<div className={styles.icon}>
						<IcMSearchlight fill="white" />
					</div>
					<div>
						<div className={styles.text}>
							{t('dashboard:yourDeals_text_2')}
						</div>
						<div className={styles.desc}>
							{t('dashboard:yourDeals_text_3')}
						</div>
					</div>
				</div>
				<div className={styles.btn} role="presentation" onClick={() => handelRouting()}>
					<p className={styles.viewall}>{t('dashboard:yourDeals_text_4')}</p>
					<IcMArrowNext className={styles.arrow} />
				</div>
			</div>
		</div>
	);
}

export default DiscoverRates;
