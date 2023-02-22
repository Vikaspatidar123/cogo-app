import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function LoadingState() {
	return (
		<div className={styles.main_container}>
			<Placeholder width="100%" height="44px" margin="0 0 24px 0" />
			<Placeholder width="100%" height="44px" margin="0 0 24px 0" />
			<Placeholder width="100%" height="44px" margin="0 0 24px 0" />
		</div>
	);
}

export default LoadingState;
