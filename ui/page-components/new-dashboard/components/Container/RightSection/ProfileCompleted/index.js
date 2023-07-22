import { IcMArrowNext } from '@cogoport/icons-react';
import SemiCircleProgressBar from 'react-progressbar-semicircle';

import styles from './styles.module.css';

import useProgres from '@/ui/page-components/new-dashboard/hooks/useProgres';

function ProfileCompleted() {
	const { loading, data } = useProgres();
	console.log(data, 'data', loading);
	return (
		<div className={styles.container}>
			<div>
				<SemiCircleProgressBar percentage={53} showPercentValue />
				<div className={styles.profile_text}>Profile completed</div>
			</div>
			<div className={styles.text_box}>
				<div className={styles.head_text}>Complete profile to enjoy greater benefits</div>
				<div className={styles.now}>
					<span>Complete Now</span>
					<IcMArrowNext />
				</div>
			</div>
		</div>
	);
}
export default ProfileCompleted;
