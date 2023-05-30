import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<div>
					<Placeholder className={styles.set_width_1} height="50px" margin="0 0 8px" />
					<Placeholder className={styles.set_width_2} height="20px" />
				</div>
				<div>
					<Placeholder width="50px" height="20px" />
				</div>
			</div>
			<div className={styles.section}>
				<div>
					<Placeholder className={styles.set_width_1} height="50px" margin="0 0 8px" />
					<Placeholder className={styles.set_width_2} height="20px" />
				</div>
				<div>
					<Placeholder width="50px" height="20px" />
				</div>
			</div>
		</div>
	);
}

export default Loader;
