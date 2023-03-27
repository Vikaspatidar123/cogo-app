import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.container}>
			<Placeholder width="15%" height="20px" margin="12px 0 0" />
			<Placeholder width="100%" height="32px" margin="24px 0 0 0" />
			<Placeholder width="100%" height="32px" margin="24px 0 0 0" />
			<Placeholder width="100%" height="32px" margin="24px 0 0 0" />
			<Placeholder width="100%" height="32px" margin="24px 0 0 0" />
		</div>
	);
}

export default LoadingState;
