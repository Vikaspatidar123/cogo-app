import { IcMMoney } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Header({ count }) {
	return (
		<div className={styles.card}>
			<div className={styles.card}>
				<div className={styles.iconContainer}>
					<IcMMoney fill="#0DA06A" width={20} height={20} />
				</div>
				<div className={styles.title}>Total Transactions</div>
			</div>
			<div className={styles.count}>{count}</div>
		</div>
	);
}

export default Header;
