import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<div className={styles.text_box}>
				<div className={styles.head}>Shipment Status Report (SSR): Default Preferences </div>
				<div>
					The
					<span className={styles.text}> Default Status Report </span>
					Preference
					is set to Daily with the
					following Data Points visible to all Users. If you wish to make changes,
					you can click on
					<span className={styles.text}>Edit </span>
					to modify it.
				</div>
			</div>
			<Button>Edit</Button>
		</div>
	);
}
export default Header;
