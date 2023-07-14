import { Placeholder } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function MobileView({
	fields, infoData, itm, loading,
}) {
	const { t } = useTranslation(['common', 'traderPartner']);
	const data = {};
	fields.forEach((singleItem) => {
		data[singleItem?.label || 'action'] = singleItem;
	});
	return (
		<div className={styles.container}>
			{loading ? (
				<>
					{[...Array(5).keys()].map(() => (
						<div className={styles.div}>
							<div className={styles.label}>
								<Placeholder height="20px" width="80px" />
							</div>
							<div className={styles.value}>
								<Placeholder height="20px" width="200px" />
							</div>
						</div>
					))}
				</>
			) : (
				<>
					<div className={`${styles.div}${styles.buyer}`}>
						<div className={styles.label}>
							{t('tradePartner:archived_list_config_label_1')}
							:
						</div>
						<div className={`${styles.value}${styles.buyer}`}>{infoData(data.Buyer, itm)}</div>
					</div>
					{['Quotation', 'Amount'].map((suffix) => (
						<>
							<div className={styles.flex}>
								{['Total', 'Expired'].map((prefix) => (
									<div
										className={`${styles.div}${styles.column}${
											prefix === 'Expired' && suffix === 'Amount' && 'expired'
										}`}
									>
										<div className={styles.label}>{`${prefix} ${suffix}`}</div>
										<div className={styles.value1}>
											{infoData(data[`${prefix} ${suffix}`], itm)}
										</div>
									</div>
								))}
								<div className={styles.line} />
							</div>
							{suffix === 'Quotation' && <div className={styles.horizontal_line} />}
						</>
					))}
					{data?.action && <div className={styles.value && styles.action}>{infoData(data.action, itm)}</div>}
				</>
			)}
		</div>
	);
}
export default MobileView;
