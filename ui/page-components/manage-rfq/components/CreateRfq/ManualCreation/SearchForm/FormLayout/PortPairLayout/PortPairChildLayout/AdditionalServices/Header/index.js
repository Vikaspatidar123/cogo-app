import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header({ onClose = () => {}, onSubmit = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>OPTIONS</div>

			<div className={styles.right}>
				<Button
					ghost
					onClick={onClose}
					className="secondary sm"
					id="search_form_cargo_details_cancel_button"
				>
					Cancel
				</Button>

				<Button
					onClick={onSubmit}
					className="secondary sm"
					id="search_form_cargo_details_apply_button"
				>
					Apply
				</Button>
			</div>
		</div>
	);
}

export default Header;
