import { Popover } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Field({ field }) {
	return (
		<div className={styles.col}>
			<div className={styles.card_title}>
				{field.tooltip ? (
					<Popover theme="light" render={field.tooltip} placement="top">
						<span>
							{field.label}
							<IcMInfo />
						</span>
					</Popover>
				) : (
					field.label
				)}
			</div>
		</div>
	);
}
export default Field;
