import { Button } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ onClose, onSubmit, onReset, id_prefix = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Filters</div>
			<div className={styles.right}>
				<div
					role="presentation"
					onClick={onReset}
					className={styles.reset}
					style={{ border: 'none', color: '#4F4F4F', fontSize: 12 }}
					id={`${id_prefix}_reset_btn`}
				>
					<IcMRefresh />
					Reset
				</div>
				<Button
					themeType="secondary"
					id={`${id_prefix}_cancel_btn`}
					size="sm"
					onClick={onClose}
					style={{ marginLeft: 10 }}
				>
					CANCEL
				</Button>
				<Button
					type="submit"
					size="sm"
					id={`${id_prefix}_cancel_btn`}
					onClick={onSubmit}
					style={{ marginLeft: 10 }}
				>
					APPLY
				</Button>
			</div>
		</div>
	);
}

export default Header;
