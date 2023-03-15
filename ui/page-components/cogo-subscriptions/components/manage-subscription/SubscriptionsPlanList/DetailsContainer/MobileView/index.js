/* eslint-disable import/order */
import Feature from './Feature';
// import { Container, Header, Body } from './styles';

import styles from './styles.module.css';

function MobileView({ planFeatureData = {} }) {
	const planFeatureArray = Object.keys(planFeatureData || {});
	return (
		<div className={styles.container}>
			<div className={`${styles.header} ${styles.info}`}>
				<div className={styles.icon_container}>
					<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Limited.svg" alt="cogo" />
					Limited
				</div>
				<div className={styles.icon_container}>
					<img src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/unlimted.svg" alt="cogo" />
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
