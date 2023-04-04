import { useState, useEffect, useCallback } from 'react';

import styles from './styles.module.css';

function CardHeader({ plans = {} }) {
	const [sortedPlan, setSortedPlan] = useState([]);
	const getSortPlanObj = useCallback(() => {
		const planObjArray = Object.values(plans);
		const sortPlanObjArray = planObjArray.sort(
			(a, b) => a.priority_sequence - b.priority_sequence,
		);
		setSortedPlan(sortPlanObjArray);
	}, [plans]);

	useEffect(() => {
		getSortPlanObj();
	}, [getSortPlanObj]);

	return (
		<div className={`${styles.row} ${styles.header}`}>
			<div className={`${styles.col} ${styles.feature} ${styles.feature_title}`} width="30%">
				Feature
			</div>
			<div className={styles.plan_name}>
				{(sortedPlan || []).map(({ display_name = '' }, index) => (
					<div className={`${styles.col} ${styles.plan_col} ${styles[`plan_col${[index]}`]}`}>
						{display_name}
					</div>
				))}
			</div>
		</div>
	);
}

export default CardHeader;
