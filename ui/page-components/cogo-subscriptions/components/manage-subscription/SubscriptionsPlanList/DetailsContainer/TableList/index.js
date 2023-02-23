/* eslint-disable react-hooks/exhaustive-deps */
import { Tooltip } from '@cogoport/components';
import { IcMTick, IcMInfo, IcMCross } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import Limited from '../../../../../asset/Limited.svg';
import Unlimited from '../../../../../asset/unlimted.svg';
import styles from '../CardHeader/styles.module.css';

function TableList({ features = {} }) {
	const [featureArray, setFeatureArray] = useState([]);

	const getFeatureData = () => {
		const featureObjArray = Object.values(features);
		setFeatureArray(featureObjArray);
	};

	const renderPlanDetail = (type, value) => {
		if (type === 'icon') {
			if (value) {
				return <IcMTick fill="#4BB543" width={28} height={28} />;
			}
			return <IcMCross fill="#e63946" width={20} height={20} />;
		}

		if (type === 'text') {
			if (value === 'unlimited') {
				return <Unlimited width="25px" height="25px" />;
			}
			if (value > 0) {
				return (
					<>
						<Limited width="25px" height="25px" />
						{' '}
						<div className={styles.value_txt}>{value}</div>
					</>
				);
			}
			return value;
		}
		return null;
	};

	const getPlanDetails = (planValues = {}) => {
		const planValuesObjArray = Object.values(planValues);
		const sortPlanValuesObjArray = planValuesObjArray.sort(
			(a, b) => a?.priority_sequence - b?.priority_sequence,
		);

		return (sortPlanValuesObjArray || []).map(({ type = '', value = '' }) => (
			<div className={`${styles.col} ${styles.row_value}`}>{renderPlanDetail(type, value)}</div>
		));
	};

	useEffect(() => {
		getFeatureData();
	}, [JSON.stringify(features)]);
	return (
		<>
			{(featureArray || []).map(
				({ display_name = '', description = null, plan_values = {} }) => (
					<div className={styles.row}>
						<div className={`${styles.col} ${styles.feature} ${styles.feature_name}`} width="30%">
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
						<div className={styles.plan_name}>{getPlanDetails(plan_values)}</div>
					</div>
				),
			)}
		</>
	);
}

export default TableList;
