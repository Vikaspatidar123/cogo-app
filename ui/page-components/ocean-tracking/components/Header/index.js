import { Button } from '@cogoport/components';
import { IcMDeviation } from '@cogoport/icons-react';

import useFetchStoreQuota from '../../hooks/useFetchStoreQuota';

import styles from './styles.module.css';

function Header() {
	const { loading, quotaCount } = useFetchStoreQuota();

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Container Track & Trace</div>
			<div className={styles.upgrade_container}>
				<IcMDeviation />
				<div className={styles.text}>
					Tracker Remaining (
					{quotaCount}
					)
				</div>
				<Button themeType="accent" size="sm" loading={loading}>Upgrade</Button>
			</div>
			<div className={styles.button_container}>
				<div className={styles.status}>Manage status report</div>
				<Button>Create New</Button>
			</div>
		</div>
	);
}
export default Header;
