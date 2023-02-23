/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
import { useEffect, useState } from 'react';

import Limited from '../../../../asset/Limited.svg';
import Unlimited from '../../../../asset/unlimted.svg';

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
	}, [planFeatureData]);

	console.log('selectedData', selectedData);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className="titleContainer">
					<div className={styles.title}>Explore All Features</div>
					<div className={styles.line} />
				</div>
				<div className={`${styles.header} ${styles.info}`}>
					<div className={styles.icon_container}>
						<Limited width="20px" height="25px" />
						Limited
					</div>
					<div className={styles.icon_container}>
						<Unlimited width="30px" height="14px" />
						Unlimited
					</div>
				</div>
			</div>

			<div className={styles.tab_container}>
				{/* <Tabs activeTab={activeTab} onChange={setActiveTab} themeType="primary-vertical">
					{(planFeatureArray || []).map((featureKey) => {
						const feature = planFeatureData[featureKey];
						return (
							<TabPanel
								name={featureKey}
								title={feature?.display_name}
								// className="vertical two"
							>
								<div key={feature?.display_name}>
									<CardHeader plans={feature?.plans} />
									<TableList features={feature?.features} />
								</div>
							</TabPanel>
						);
					})}
				</Tabs> */}

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
