import { cl } from '@cogoport/components';
import {
	IcCGreenCircle,
	IcCRedCircle,
	IcCYelloCircle,
} from '@cogoport/icons-react';

import CONTROLS_TITLE_MAPPING from '../../../configurations/controlsTitleMapping';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const RESPONSE_MAPPING = {
	Y: {
		text : 'Yes',
		url  : GLOBAL_CONSTANTS.image_url.iec_green_flag,
		icon : <IcCGreenCircle width={12} height={12} />,
	},
	N: {
		text : 'No',
		url  : GLOBAL_CONSTANTS.image_url.iec_red_flag,
		icon : <IcCRedCircle width={12} height={12} />,
	},
	M: {
		text : 'May be',
		url  : GLOBAL_CONSTANTS.image_url.iec_yellow_flag,
		icon : <IcCYelloCircle width={12} height={12} />,
	},
};

function ResultDetails({ activeTab, controls = [] }) {
	return (
		<div className={styles.container}>
			<div className={cl`${styles.result_heading} ${styles.text}`}>
				{CONTROLS_TITLE_MAPPING?.[activeTab]}
			</div>

			<div className={styles.table_heading}>
				<div className={cl`${styles.header} ${styles.text}`}>Control Type</div>
				<div className={styles.text}>Result</div>
			</div>

			<div className={styles.list}>
				{(controls || [])?.map((control) => {
					const { description = '', status = '' } = control || {};
					return (
						<div
							key={`${description}_${status}`}
							className={styles.table_col}
						>
							<div className={styles.header}>{description}</div>
							<div className={styles.table_content}>
								<span>{RESPONSE_MAPPING?.[status].icon}</span>
								<span className={styles.table_text}>
									{RESPONSE_MAPPING?.[status].text}
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
export default ResultDetails;
