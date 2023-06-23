import { cl } from '@cogoport/components';

import { SEVERITY_MAPPING } from '../../../../constant/card';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

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
				{formatDate({
					date       : lastUpdated,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aa'],
					formatType : 'dateTime',
				})}
			</div>

		</div>
	);
}
export default Footer;
