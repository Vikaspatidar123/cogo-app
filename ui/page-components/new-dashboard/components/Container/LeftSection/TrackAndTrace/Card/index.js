import { useTranslation } from 'next-i18next';

import styles from '../styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import CountCameDown from '@/ui/page-components/new-dashboard/common/CountCameDown';

function Card({ count, loading, track = true }) {
	const { t } = useTranslation(['dashboard']);
	const imageUrl = track ? GLOBAL_CONSTANTS.image_url.clock_image : GLOBAL_CONSTANTS.image_url.track_image;
	return (
		<div className={styles.count_card}>
			<div className={styles.text}>
				{track ? t('dashboard:common_trackingCard_text_2') : t('dashboard:common_trackingCard_text_1')}
			</div>

			<div className={styles.down}>
				<Image
					src={imageUrl}
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
