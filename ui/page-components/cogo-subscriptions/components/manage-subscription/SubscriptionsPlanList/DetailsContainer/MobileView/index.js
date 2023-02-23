/* eslint-disable import/order */
import Limited from '../../../../../asset/Limited.svg';
import Unlimited from '../../../../../asset/unlimted.svg';

import Feature from './Feature';
// import { Container, Header, Body } from './styles';

import styles from './styles.module.css';

function MobileView({ planFeatureData = {} }) {
	const planFeatureArray = Object.keys(planFeatureData || {});
	return (
		<div className={styles.container}>
			<div className={`${styles.header} ${styles.info}`}>
				<div className={styles.icon_container}>
					<Limited width="22px" height="16px" />
					Limited
				</div>
				<div className={styles.icon_container}>
					<Unlimited width="22px" height="16px" />
					Unlimited
				</div>
			</div>
			<div className={styles.body}>
				{(planFeatureArray || []).map((featureKey) => {
					const feature = planFeatureData[featureKey];
					return (
						<Feature
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
