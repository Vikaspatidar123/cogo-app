import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header({ onClose = () => {}, onSubmit = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>OPTIONS</div>

			<div className={styles.right}>
				<Button
					onClick={onClose}
					themeType="secondary"
					className={styles.btn_cancel}
					id="search_form_cargo_details_cancel_button"
					type="button"
				>
					Cancel
				</Button>

				<Button
					onClick={onSubmit}
					id="search_form_cargo_details_apply_button"
					type="submit"
				>
					Apply
				</Button>
			</div>
		</div>
	);
}

export default Header;
