import { cl } from '@cogoport/components';

import Feature from './Feature';
import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function MobileView({ planFeatureData = {} }) {
	const planFeatureArray = Object.keys(planFeatureData || {});
	return (
		<div className={styles.container}>
			<div className={cl`${styles.header} ${styles.info}`}>
				<div className={styles.iconContainer}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.limited_image}
						alt="limited"
						width={25}
						height={25}
					/>
					Limited
				</div>
				<div className={styles.iconContainer}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.unlimted_image}
						alt="unlimted"
						width={25}
						height={25}
					/>
					Unlimited
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
