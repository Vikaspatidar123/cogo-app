import { Select } from '@cogoport/components';
import { upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Title({ serviceName, options, props }) {
	const { isEdit } = props || {};
	return (
		<div className={styles.container}>
			<div>
				{upperCase(serviceName)}
				{' '}
				Shipments
			</div>
			{!isEdit ? (
				<div>
					20 of 20 Data Points Visible
				</div>
			)
				: (
					<div className={styles.container}>
						<div className={styles.edit}>Edit Columns</div>
						<Select
							size="sm"
							style={{ width: '250px' }}
							options={options}
						/>
					</div>
				)}
		</div>
	);
}

export default Title;
