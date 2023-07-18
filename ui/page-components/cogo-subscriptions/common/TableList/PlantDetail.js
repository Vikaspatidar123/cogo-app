import { IcMTick, IcMCross } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function PlanDetailRenderer({ type, value }) {
	if (type === 'icon') {
		return value ? (
			<IcMTick fill="#4BB543" width={28} height={28} />
		) : (
			<IcMCross fill="#e63946" width={20} height={20} />
		);
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
}

const PlanDetails = ({ planValues = {} }) => {
	const planValuesObjArray = Object.values(planValues);
	const sortPlanValuesObjArray = planValuesObjArray.sort(
		(a, b) => a.priority_sequence - b.priority_sequence,
	);

	return (sortPlanValuesObjArray || []).map(({ type = '', value = '' }) => (
		<div className={`${styles.col} ${styles.row_value}`} key={value}>
			<PlanDetailRenderer type={type} value={value} />

		</div>
	));
};
export default PlanDetails;
