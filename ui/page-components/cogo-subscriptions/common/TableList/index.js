import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { useState, useEffect, useCallback } from 'react';

import PlanDetails from './PlantDetail';
import styles from './styles.module.css';

function TableList({ features = {} }) {
	const [featureArray, setFeatureArray] = useState([]);

	const getFeatureData = useCallback(() => {
		const featureObjArray = Object.values(features);
		setFeatureArray(featureObjArray);
	}, [features]);

	useEffect(() => {
		getFeatureData();
	}, [getFeatureData]);
	return (
		<>
			{(featureArray || []).map(
				({ display_name = '', description = null, plan_values = {} }) => (
					<div className={styles.row} key={plan_values}>
						<div className={`${styles.col} ${styles.feature} ${styles.feature_name}`}>
							<div className={styles.info_icon}>
								{description ? (
									<Tooltip
										content={description}
										placement="top"
									>
										<div>
											<IcMInfo width={15} height={15} />
										</div>
									</Tooltip>
								) : (
									<IcMInfo width={15} height={15} />
								)}
							</div>
							<div className={styles.row_title_value}>{display_name}</div>
						</div>
						<div className={styles.plan_name}>
							<PlanDetails planValues={plan_values} />
						</div>
					</div>
				),
			)}
		</>
	);
}

export default TableList;
