import styles from './styles.module.css';

export const getBillTypeOptions = ({ t }) => [
	{
		label : t('transactionHistory:bill_type_label_1'),
		value : 'INSURANCE',
	},
	{
		label : t('transactionHistory:bill_type_label_2'),
		value : 'PREMIUM_SERVICES',
	},
	{
		label : t('transactionHistory:bill_type_label_3'),
		value : 'SUBSCRIPTION',
	},
];

export const getPaymentTypeOption = ({ t }) => [
	{
		children: (
			<div className={styles.import_export}>
				<div className={styles.type_label}>{t('transactionHistory:payment_type_label_1')}</div>
			</div>
		),
		key: 'PAID',
	},
	{
		children: (
			<div className={styles.import_export}>
				<div className={styles.type_label}>{t('transactionHistory:payment_type_label_2')}</div>
			</div>
		),
		key: 'PENDING',
	},
	{
		children: (
			<div className={styles.import_export}>
				<div className={styles.type_label}>{t('transactionHistory:payment_type_label_3')}</div>
			</div>
		),
		key: 'PAYMENT_FAILED',
	},
];
