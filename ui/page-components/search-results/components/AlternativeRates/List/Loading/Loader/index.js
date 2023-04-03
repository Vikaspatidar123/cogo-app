import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.container}>
			<div>
				<Placeholder width="320px" height="50px" margin="0 0 8px" />
				<Placeholder width="220px" height="20px" />
			</div>
			<div>
				<Placeholder width="50px" height="20px" />
			</div>
		</div>
	);
}

export default Loader;
