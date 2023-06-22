import { cl } from '@cogoport/components';

import listConfig from '../../configurations/listconfig';
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
	return (
		<div className={styles.container}>
			<div className={cl`${styles.title_section} ${styles.mobile}`}>
				<div className={styles.header}>
					<h1 className={styles.title}>My Transactions </h1>
					<div className={styles.line_wrapper}>
						<div className={styles.line} />
					</div>
				</div>
				<AllFilters filters={filters} setFilters={setFilters} />
			</div>
			<div className={styles.card_container}>
				<List
					config={listConfig}
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
