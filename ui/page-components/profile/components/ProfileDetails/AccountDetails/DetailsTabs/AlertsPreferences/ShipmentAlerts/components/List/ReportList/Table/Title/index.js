import { upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Title({ serviceName }) {
	return (
		<div className={styles.container}>
			<div>
				{upperCase(serviceName)}
				{' '}
				Shipments
			</div>
			<div>20 of 20 Data Points Visible</div>
		</div>
	);
}

export default Title;
