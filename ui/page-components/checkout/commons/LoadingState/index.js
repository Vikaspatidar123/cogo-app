import styles from './styles.module.css';

import Spinner from '@/ui/commons/components/Spinner';

function LoadingState() {
	return (
		<div className={styles.container}>
			<div className={styles.loading_text}>Preparing your shipment</div>
			<Spinner size={20} borderWidth={3} spinBorderColor="#F4B746" />
		</div>
	);
}

export default LoadingState;
