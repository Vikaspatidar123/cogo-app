import { IcMTick, IcMCross } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React from 'react';

import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const SHOW_LIMIT = 0;

const ICON_MAPPING = {
	true  : <IcMTick fill="#4BB543" width={28} height={28} />,
	false : <IcMCross fill="#e63946" width={20} height={20} />,
};

function IconRenderer({ value }) {
	return ICON_MAPPING[value];
}

function TextRenderer({ value }) {
	const { t } = useTranslation(['subscriptions']);
	if (value === 'unlimited') {
		return (
			<Image
				src={GLOBAL_CONSTANTS.image_url.unlimted_image}
				alt={t('subscriptions:cogo_text')}
				width={30}
				height={30}
			/>
		);
	}

	if (value > SHOW_LIMIT) {
		return (
			<>
				<Image
					src={GLOBAL_CONSTANTS.image_url.limited_image}
					alt={t('subscriptions:cogo_text')}
					width={30}
					height={30}
				/>
				<div className={styles.value_txt}>{value}</div>
			</>
		);
	}

	return value;
}

const MAPPING = {
	icon : IconRenderer,
	text : TextRenderer,
};

const PlanDetails = ({ planValues = {} }) => {
	const sortedPlanValues = Object.values(planValues).sort(
		(a, b) => a.priority_sequence - b.priority_sequence,
	);

	return sortedPlanValues.map(({ type = '', value = '' }) => {
		const Component = MAPPING[type] || null;

		return (
			<div className={`${styles.col} ${styles.row_value}`} key={value}>
				{Component && <Component key={type} value={value} />}
			</div>
		);
	});
};

export default PlanDetails;
