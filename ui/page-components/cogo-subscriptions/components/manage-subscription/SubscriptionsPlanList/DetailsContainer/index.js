import { useEffect, useState } from 'react';

import CardHeader from './CardHeader';
import styles from './styles.module.css';
import TableList from './TableList';

function DetailContainer({ planFeatureData = {} }) {
	const planFeatureArray = Object.keys(planFeatureData || {});
	const [selectedData, setSelectedData] = useState({
		key  : 'general',
		data : planFeatureData.general,
	});

	const getSelectedData = (val) => {
		setSelectedData({
			key  : val,
			data : planFeatureData[val],
		});
	};

	useEffect(() => {
		setSelectedData({
			key  : 'general',
			data : planFeatureData[selectedData.key],
		});
	}, []);
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className="titleContainer">
					<div className={styles.title}>Explore All Features</div>
					<div className={styles.line} />
				</div>
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
			</div>

			<div className={styles.tab_container}>
				<div className={styles.col1}>
					{(planFeatureArray || []).map((featureKey) => {
						const feature = planFeatureData[featureKey];
						return (
							<div
								className={`${styles.feature_card}
								${selectedData.key === featureKey ? styles.active : null}`}
								role="presentation"
								onClick={() => getSelectedData(featureKey)}
							>
								{feature?.display_name}
							</div>
						);
					})}
				</div>

				<div className={styles.col2}>
					<CardHeader plans={selectedData?.data?.plans} />
					<TableList features={selectedData?.data?.features} />
				</div>
			</div>
		</div>
	);
}

export default DetailContainer;
