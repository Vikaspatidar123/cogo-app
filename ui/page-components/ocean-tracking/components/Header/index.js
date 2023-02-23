import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<div>Container Track & Trace</div>
			<div>Upgrade</div>
			<div className={styles.container}>
				<div>Manage status report</div>
				<Button>Create New</Button>
			</div>
		</div>
	);
}
export default Header;
