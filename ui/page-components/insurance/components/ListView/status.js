import {
	IcCGreenCircle,
	IcCRedCircle,
	IcCYelloCircle,
	IcCCircle,
} from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const paymentStatus = {
	PAYMENT_SUCCESS: (
		<div className={styles.status_div}>
			<IcCGreenCircle />
			<div>Payment Success</div>
		</div>
	),
	DRAFT: (
		<div className={styles.status_div}>
			<IcCYelloCircle />
			<div>Draft</div>
		</div>
	),
	POLICY_GENERATED: (
		<div className={styles.status_div}>
			<IcCGreenCircle />
			<div>Policy Generated</div>
		</div>
	),
	EXPIRED: (
		<div className={styles.status_div}>
			<IcCRedCircle />
			<div>Expired</div>
		</div>
	),
	PAYMENT_INITIATED: (
		<div className={styles.status_div}>
			<IcCCircle />
			<div>Payment Initiated</div>
		</div>
	),
	CANCELLED: (
		<div className={styles.status_div}>
			<IcCRedCircle />
			<div>Cancelled</div>
		</div>
	),
	CANCEL_INITIATED: (
		<div className={styles.status_div}>
			<IcCRedCircle />
			<div>Cancel Initiated</div>
		</div>
	),
};

export default paymentStatus;
