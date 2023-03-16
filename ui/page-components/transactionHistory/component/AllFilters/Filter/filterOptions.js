import { IcMRateManagement } from '@cogoport/icons-react';

import styles from './styles.module.css';

export const OPTIONS = [
	{
		label : 'SENT',
		value : 'SENT',
	},
	{
		label : 'DRAFTED',
		value : 'DRAFTED',
	},
];

export const BILLTYPEOPTIONS = [
	{
		label : 'INSURANCE',
		value : 'INSURANCE',
	},
	{
		label : 'PREMIUM SERVICES',
		value : 'PREMIUM_SERVICES',
	},
	{
		label : 'SUBSCRIPTION',
		value : 'SUBSCRIPTION',
	},
];

export const PAYMENTTYPEOPTIONS = [
	{
		children: (
			<div className={styles.import_export}>
				<div className={styles.type_label}>PAID</div>
			</div>
		),
		key: 'PAID',
	},
	{
		children: (
			<div className={styles.import_export}>
				<div className={styles.type_label}>PENDING</div>
			</div>
		),
		key: 'PENDING',
	},
	{
		children: (
			<div className={styles.import_export}>
				<div className={styles.type_label}>FAILED</div>
			</div>
		),
		key: 'PAYMENT_FAILED',
	},
];

export const OPTIONRISK = [
	{
		label: (
			<div className={styles.import_export}>
				<IcMRateManagement fill="#6B6D81" width={18} height={18} />
				<div className={styles.type_label}>All Risk</div>
			</div>
		),
		value: 'ALL_RISK',
	},
	{
		label: (
			<div className={styles.import_export}>
				<IcMRateManagement fill="#6B6D81" width={18} height={18} />
				<div className={styles.type_label}>Basic Risk</div>
			</div>
		),
		value: 'BASIC_RISK',
	},
];
