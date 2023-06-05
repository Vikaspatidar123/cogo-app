import SemiCircleProgressBar from 'react-progressbar-semicircle';

import styles from './styles.module.css';

function ProfileCompleted() {
	return <div className={styles.container}><SemiCircleProgressBar percentage={53} showPercentValue /></div>;
}
export default ProfileCompleted;
