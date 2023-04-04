import React from 'react';

import Filter from './Filter';
import Sort from './Sort';
import styles from './styles.module.css';

function Header({
	search_type = '',
	setSort = () => {},
	sortBy = '',
	setFilters,
	state = {},
}) {
	return (
		<div className={styles.container}>
			{search_type === 'fcl_freight' && (
				<div className={styles.filter}>
					<Filter setFilters={setFilters} state={state} />
				</div>
			)}
			<Sort search_type={search_type} setSort={setSort} sortBy={sortBy} />
		</div>
	);
}

export default Header;
