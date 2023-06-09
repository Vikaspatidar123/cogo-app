import { cl } from '@cogoport/components';
import { useMemo } from 'react';

import { SEVERITY_MAPPING } from '../../../../constant/card';
import { formatDateTime, formatDate } from '../../../../utils/formatDateTime';

import styles from './styles.module.css';

const renderTitle = ({ next_milestone = '' }) => {
	if (next_milestone) return 'Next Milestone';
	return 'Current Milestone';
};

function Footer({ lastUpdated = '', milestones = {}, action = {} }) {
	const { next_milestone } = milestones || {};

	const { severity = '' } = action || {};

	const { milestone, milestoneDate, mileStoneLocation } = useMemo(() => {
		const {
			current_milestone = '',
			current_milestone_date = '',
			current_milestone_location = '',
			next_milestone_date = '', next_milestone_location = '',
		} = milestones || {};
		return {
			milestone         : next_milestone || current_milestone,
			milestoneDate     : next_milestone_date || current_milestone_date,
			mileStoneLocation : next_milestone_location || current_milestone_location,
		};
	}, [milestones, next_milestone]);

	return (
		<div className={cl`${styles.flex_box} ${styles.footer_container}`}>
			<div className={cl`${styles.flex_box} ${styles.first_section}`}>

				<div className={styles.severity_section}>
					{SEVERITY_MAPPING?.[severity]?.icon}
					<span className={`${styles?.[SEVERITY_MAPPING?.[severity]?.class]}`}>
						{SEVERITY_MAPPING?.[severity]?.title}
					</span>
				</div>

				{milestone && (
					<div className={styles.next_milestone}>
						{renderTitle({ next_milestone })}
						{' '}
						:
						{' '}
						{`${milestone} at ${mileStoneLocation} on ${formatDate({
							date       : milestoneDate,
							dateFormat : 'dd MMM yyyy',
						})}`}
					</div>
				)}
			</div>

			<div>
				Last updated at:
				{' '}
				{formatDateTime({
					date       : lastUpdated,
					dateFormat : 'dd MMM yyyy',
					timeFormat : 'hh:mm aa',
				})}
			</div>

		</div>
	);
}
export default Footer;
