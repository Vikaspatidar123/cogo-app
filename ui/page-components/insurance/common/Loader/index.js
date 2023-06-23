import { Loader as LoaderComponent } from '@cogoport/components';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.skeleton_wrapper}>
			<LoaderComponent themeType="primary" />
		</div>
	);
}

export default Loader;
