import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import Feature from './Feature';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function MobileView({ planFeatureData = {} }) {
	const planFeatureArray = Object.keys(planFeatureData || {});
	const { t } = useTranslation(['subscriptions']);
	return (
		<div className={styles.container}>
			<div className={cl`${styles.header} ${styles.info}`}>
				<div className={styles.iconContainer}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.limited_image}
						alt={t('subscriptions:cogo_text')}
						width={25}
						height={25}
					/>
					{t('subscriptions:limited_text')}
				</div>
				<div className={styles.iconContainer}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.unlimted_image}
						alt={t('subscriptions:cogo_text')}
						width={25}
						height={25}
					/>
					{t('subscriptions:unlimited_text')}
				</div>
			</div>
			<div className={styles.body}>
				{(planFeatureArray || []).map((featureKey) => {
					const feature = planFeatureData[featureKey];
					return (
						<Feature
							key={featureKey}
							title={feature?.display_name}
							plans={feature?.plans}
							features={feature?.features}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default MobileView;
