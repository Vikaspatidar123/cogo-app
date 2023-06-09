import { IcMImportfile, IcMExportfile, IcMRateManagement } from '@cogoport/icons-react';

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

export const options = [
	{
		label : 'DRAFT',
		value : 'DRAFT',
	},
	{
		label : 'PAYMENT SUCCESS',
		value : 'PAYMENT_SUCCESS',
	},
	{
		label : 'POLICY GENERATED',
		value : 'POLICY_GENERATED',
	},
	{
		label : 'PAYMENT INITIATED',
		value : 'PAYMENT_INITIATED',
	},
];
export const optionsType = [
	{
		suffix: (
			<div className={styles.import_export}>
				<IcMImportfile fill="#6B6D81" width={18} height={18} />
				<div className={styles.type_label}>Import</div>
			</div>
		),
		key: 'IMPORT',
	},
	{
		suffix: (
			<div className={styles.import_export}>
				<IcMExportfile fill="#6B6D81" width={18} height={18} />
				<div className={styles.type_label}>Export</div>
			</div>
		),
		key: 'EXPORT',
	},
	{
		suffix: (
			<div className={styles.import_export}>
				<IcMExportfile fill="#6B6D81" width={18} height={18} />
				<div className={styles.type_label}>Inland</div>
			</div>
		),
		key: 'INLAND',
	},
];
export const optionsRisk = [
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
