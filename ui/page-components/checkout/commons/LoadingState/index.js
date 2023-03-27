import { Loader } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.container}>
			<div className={styles.loading_text}>Preparing your shipment</div>
			<Loader themeType="primary" />
		</div>
	);
}

export default LoadingState;
