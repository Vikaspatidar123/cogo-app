import { cl } from '@cogoport/components';

import { SEVERITY_MAPPING } from '../../../../constant/card';
import { formatDateTime } from '../../../../utils/formatDateTime';

import styles from './styles.module.css';

function Footer({ lastUpdated = '', currentMilestone = {}, currentContainerAction = {} }) {
	const { current_status } = currentMilestone || {};
	const { current_milestone = '', next_milestone = '', last_milestone = '' } = current_status || {};
	const { severity = '' } = currentContainerAction || {};

	const milestone = next_milestone || current_milestone || last_milestone;

	const renderTitle = () => {
		if (next_milestone) return 'Next Milestone';
		if (current_milestone) return 'Current Milestone';
		return 'Last Milestone';
	};
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
						{renderTitle()}
						{' '}
						:
						{' '}
						{milestone}
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
