import dynamic from 'next/dynamic';
import React from 'react';

import Filter from './Filter';
import RefreshRate from './RefreshRate';
import Sort from './Sort';
import styles from './styles.module.css';

const CopyUrl = dynamic(() => import('./CopyUrl'), { ssr: false });

function Header({
	search_type = '',
	refetch = () => {},
	setSort = () => {},
	sortBy = '',
	setFilters,
	detail = {},
	state = {},
	isMobile,
}) {
	return (
		<div className={styles.main}>
			<div className={styles.section}>
				{search_type === 'fcl_freight' && (
					<Filter setFilters={setFilters} state={state} isMobile={isMobile} />
				)}
				<Sort search_type={search_type} setSort={setSort} sortBy={sortBy} />

				<RefreshRate refetch={refetch} detail={detail} />

				{search_type ? (
					<CopyUrl detail={detail} />
				) : null}
			</div>
		</div>
	);
}

export default Header;
