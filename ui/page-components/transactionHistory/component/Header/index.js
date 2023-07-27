import { IcMMoney } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Header({ count }) {
	const { t } = useTranslation(['transactionHistory']);

	return (
		<div className={styles.card}>
			<div className={styles.card}>
				<div className={styles.icon_container}>
					<IcMMoney fill="#0DA06A" width={20} height={20} />
				</div>
				<div className={styles.title}>{t('transactionHistory:main_title')}</div>
			</div>
			<div className={styles.count}>{count}</div>
		</div>
	);
}

export default Header;
