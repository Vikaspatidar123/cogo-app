import { cl } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import AllFilters from '../AllFilters';
import List from '../List';

import styles from './styles.module.css';

function Transaction({
	setFilters,
	realData,
	filters,
	sort,
	setSort,
	loading,
}) {
	const { t } = useTranslation(['transactionHistory']);
	return (
		<div className={styles.container}>
			<div className={cl`${styles.title_section} ${styles.mobile}`}>
				<div className={styles.header}>
					<h1 className={styles.title}>{t('transactionHistory:main_title')}</h1>
					<div className={styles.line_wrapper}>
						<div className={styles.line} />
					</div>
				</div>
				<AllFilters filters={filters} setFilters={setFilters} />
			</div>
			<div className={styles.card_container}>
				<List
					data={realData || []}
					loading={loading}
					setGlobalFilters={setFilters}
					showPagination="true"
					filters={filters}
					sort={sort}
					setSort={setSort}
				/>
			</div>
		</div>
	);
}

export default Transaction;
