import React from 'react';

import styles from './styles.module.css';

import { Link } from '@/packages/next';

function KycMessage() {
	return (
		<div className={styles.container}>
			<div className={styles.title}>KYC Pending</div>

			<div className={styles.description}>
				<span>
					Before you can create your request, we need some basic information about company. Don’t
					worry, you’ll also be able to update this information later.
				</span>

				<Link href="/kyc" passHref>
					<div className={styles.action}>Complete KYC</div>
				</Link>
			</div>
		</div>
	);
}

export default KycMessage;
