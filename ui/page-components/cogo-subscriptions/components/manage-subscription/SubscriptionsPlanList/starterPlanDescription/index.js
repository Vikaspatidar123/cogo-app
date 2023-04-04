import { IcMFtick } from '@cogoport/icons-react';

import logoMapping from '../../../../utils/logoMapping';

import styles from './styles.module.css';

function StarterPlanDescription({ item, priority_sequence_active_plan, activeTab }) {
	const Mapping = logoMapping();

	const {
		description = '',
		priority_sequence: prioritySequence = '',
		metadata = {},
		display_pricing = '',
	} = item || {};

	const iconMappigArr = ['1', '2'];

	return (
		<div className={styles.container}>
			<div className={styles.plan_type_heading}>
				{iconMappigArr.includes(description)
				&& <div className={styles.plan_type_icon}>{Mapping[description] || ''}</div>}
				<div className={styles.plan_title}>
					<div className={styles.heading} style={{ color: '#2c3e50' }}>{description}</div>
					{metadata?.plan_liner && (
						<div className={styles.subheading}>{metadata?.plan_liner}</div>
					)}
				</div>
			</div>
			<div
				className={styles.price}
				style={{ color: prioritySequence === `${priority_sequence_active_plan ? '#2c3e50' : '#bdbdbd'}` }}
			>
				Free
			</div>
			<div className={styles.plan_features}>
				<div className={styles.list}>
					{(metadata?.plan_details || []).map(({ value = '', display_name = '' }) => (
						<div className={styles.flex} key={display_name}>
							<IcMFtick
								className={styles.tick_icon}
								fill={
										prioritySequence >= priority_sequence_active_plan
											? '#67c676'
											: '#cac7d3'
									}
								width={16}
								height={16}
							/>
							{value && <div className={styles.number}>{value}</div>}
							<div className={styles.text}>{display_name}</div>
						</div>
					))}
				</div>
			</div>

			{display_pricing[`${activeTab}`].is_active_plan && (
				<div className={styles.active_plan}>
					<IcMFtick fill="#67c676" width={35} height={35} />
					<div className={styles.active}>Active</div>
				</div>
			)}
		</div>
	);
}
export default StarterPlanDescription;
