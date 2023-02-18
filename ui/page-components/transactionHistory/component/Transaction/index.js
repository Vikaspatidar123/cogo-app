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
	isMobile,
}) {
	return (
		<div className={styles.container}>
			<div className={`${styles.title_section} ${isMobile && styles.mobile}`}>
				<div className={styles.header}>
					<h1 className={styles.title}>My Transactions </h1>
					<div className={styles.line_wrapper}>
						<div className={styles.line} />
					</div>
				</div>
				<AllFilters filters={filters} setFilters={setFilters} isMobile={isMobile} />
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
					isMobile={isMobile}
				/>
			</div>
		</div>
	);
}

export default Transaction;
