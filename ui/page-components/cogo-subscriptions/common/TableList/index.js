import { Tooltip } from '@cogoport/components';
import { IcMTick, IcMInfo, IcMCross } from '@cogoport/icons-react';
import { useState, useEffect, useCallback } from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function TableList({ features = {} }) {
	const [featureArray, setFeatureArray] = useState([]);

	const getFeatureData = useCallback(() => {
		const featureObjArray = Object.values(features);
		setFeatureArray(featureObjArray);
	}, [features]);

	const renderPlanDetail = (type, value) => {
		if (type === 'icon') {
			if (value) {
				return <IcMTick fill="#4BB543" width={28} height={28} />;
			}
			return <IcMCross fill="#e63946" width={20} height={20} />;
		}

		if (type === 'text') {
			if (value === 'unlimited') {
				return (
					<Image
						src={GLOBAL_CONSTANTS.image_url.unlimted_image}
						alt="cogo"
						width={30}
						height={30}
					/>
				);
			}
			if (value > 0) {
				return (
					<>
						<Image
							src={GLOBAL_CONSTANTS.image_url.limited_image}
							alt="cogo"
							width={30}
							height={30}
						/>
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
			(a, b) => a.priority_sequence - b.priority_sequence,
		);

		return (sortPlanValuesObjArray || []).map(({ type = '', value = '' }) => (
			<div className={`${styles.col} ${styles.row_value}`} key={value}>
				{
					renderPlanDetail(type, value)
				}

			</div>
		));
	};

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
						<div className={styles.plan_name}>{getPlanDetails(plan_values)}</div>
					</div>
				),
			)}
		</>
	);
}

export default TableList;
