import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader({ mobile = false }) {
	const width1 = mobile ? '200px' : '500px';
	const width2 = mobile ? '250px' : '300px';

	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<div>
					<Placeholder width={width1} height="50px" margin="0 0 8px" />
					<Placeholder width={width2} height="20px" />
				</div>
				<div>
					<Placeholder width="50px" height="20px" />
				</div>
			</div>
			<div className={styles.section}>
				<div>
					<Placeholder width={width1} height="50px" margin="0 0 8px" />
					<Placeholder width={width2} height="20px" />
				</div>
				<div>
					<Placeholder width="50px" height="20px" />
				</div>
			</div>
		</div>
	);
}

export default Loader;
