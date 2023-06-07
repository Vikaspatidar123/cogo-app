import { Button } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';

import styles from './styles.module.css';

function ValueChip({ value, onCancel, style }) {
	return (
		<div className={styles.container} style={style}>
			<p>{value}</p>
			<Button
				renderIcon={() => (
					<div className={styles.icon_container}>
						<IcMCross onClick={onCancel} />
					</div>
				)}
				themeType="green text flat link"
				onClick={onCancel}
				type="button"
				style={{ marginLeft: '6px', color: '#000000' }}
			/>
		</div>
	);
}

export default ValueChip;
