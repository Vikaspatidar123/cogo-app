import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function Header({ setShowDashboard = () => {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>Manage RFQ</div>
			<Button onClick={() => setShowDashboard(false)}>
				Request RFQ
			</Button>
		</div>
	);
}

export default Header;
