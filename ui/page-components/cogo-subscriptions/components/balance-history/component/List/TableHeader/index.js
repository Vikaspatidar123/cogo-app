import { cl } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import styles from './styles.module.css';

function TableHeader({ setOrderBy }) {
	const { t } = useTranslation(['subscriptions']);
	const [sortDate, setSortDate] = useState('asc');
	const [sortUsage, setSortUsage] = useState('asc');

	const sortFn = (entity) => {
		if (entity === 'date') {
			setSortDate((prev) => (prev === 'asc' ? 'desc' : 'asc'));
			setOrderBy({
				key   : 'created_at',
				order : sortDate,
			});
		}
		if (entity === 'usage') {
			setSortUsage((prev) => (prev === 'asc' ? 'desc' : 'asc'));
			setOrderBy({
				key   : 'created_at',
				order : sortUsage,
			});
		}
	};

	return (
		<div className={`${styles.row} ${styles.table_head}`}>
			<div className={styles.wd_100}>{t('subscriptions:sr_no_text')}</div>
			<div className={styles.wd_150}>{t('subscriptions:feature_name_text')}</div>
			<div className={styles.wd_150}>{t('subscriptions:event_name_text')}</div>
			<div className={cl`${styles.wd_150} ${styles.flex}`}>
				{t('subscriptions:date_text')}
				<div
					role="presentation"
					className={`${sortDate === 'asc' ? styles.asc : styles.desc}`}
					onClick={() => sortFn('date')}
				>
					<div className={styles.icon}>
						<IcMArrowDown />
					</div>
				</div>
			</div>
			<div className={`${styles.wd_150} ${styles.flex}`}>
				{t('subscriptions:usage_text')}
				<div
					role="presentation"
					className={`${sortUsage === 'asc' ? styles.asc : styles.desc}`}
					onClick={() => sortFn('usage')}
				>
					<div className={styles.icon}>
						<IcMArrowDown />
					</div>
				</div>
			</div>
		</div>
	);
}
export default TableHeader;
