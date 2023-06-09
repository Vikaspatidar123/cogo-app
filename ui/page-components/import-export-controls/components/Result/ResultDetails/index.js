import { cl } from '@cogoport/components';
import {
	IcCGreenCircle,
	IcCRedCircle,
	IcCYelloCircle,
} from '@cogoport/icons-react';

import iconUrl from '../../../utils/iconUrl.json';

import styles from './styles.module.css';

const textMapping = {
	Y: {
		text : 'Yes',
		url  : iconUrl.greenFlag,
		icon : <IcCGreenCircle width={12} height={12} />,
	},
	N: {
		text : 'No',
		url  : iconUrl.redFlag,
		icon : <IcCRedCircle width={12} height={12} />,
	},
	M: {
		text : 'May be',
		url  : iconUrl.yellowFlag,
		icon : <IcCYelloCircle width={12} height={12} />,
	},
};

function ResultDetails({ activeTab, controls = [] }) {
	return (
		<div className={styles.container}>
			{activeTab === 'EXPORT' ? (
				<div className={cl`${styles.result_heading} ${styles.text}`}>Export Control Summary</div>
			) : (
				<div className={cl`${styles.result_heading} ${styles.text}`}>Import Control Summary</div>
			)}
			<div className={styles.table_heading}>
				<div className={cl`${styles.header} ${styles.text}`}>Control Type</div>
				<div className={styles.text}>Result</div>
			</div>

			{(controls || [])?.map((control, index) => (
				<div
					key={`${control?.description}_${control?.status}_${index}`}
					className={styles.table_col}
				>
					<div className={styles.header}>{control?.description}</div>
					<div className={styles.table_content}>
						{/* <img src={textMapping?.[control?.status].url} alt="flag" /> */}
						{textMapping?.[control?.status].icon}
						{textMapping?.[control?.status].text}
					</div>
				</div>
			))}
		</div>
	);
}
export default ResultDetails;
