import { useTranslation } from 'next-i18next';

import styles from '../styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import CountCameDown from '@/ui/page-components/new-dashboard/common/CountCameDown';

function Card({ count, loading }) {
	const { t } = useTranslation(['dashboard']);

	return (
		<div className={styles.count_card}>
			<div className={styles.text}>
				{t('dashboard:common_trackingCard_text_2')}
			</div>

			<div className={styles.down}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.track_image}
					alt={t('dashboard:cogo_logo')}
					height={20}
					width={25}
				/>
				<p className={styles.count}>
					<CountCameDown
						end_count={count}
						loading={loading}
					/>
				</p>
			</div>

		</div>
	);
}
export default Card;
