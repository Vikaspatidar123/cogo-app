import { Button } from '@cogoport/components';
import { IcMPlus } from '@cogoport/icons-react';

import styles from './styles.module.css';

function BankDetails() {
	const a = 0;
	return (
		<div className={styles.headerDiv}>
			<div className={styles.header}>
				Bank Information
			</div>
			<Button
				type="button"
				size="md"
			>
				<IcMPlus />
				Add Bank
			</Button>
		</div>
	);
}

export default BankDetails;
