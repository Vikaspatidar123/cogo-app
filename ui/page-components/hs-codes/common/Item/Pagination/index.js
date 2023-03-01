import { Pagination } from '@cogoport/components';
import { useState, useEffect } from 'react';

import styles from '../../List/styles.module.css';

function Paginations({
	pageObj, refetchHsCode, headCode, headingToggle,
}) {
	const { totalRecords = 0, pageNo = 0, pageSize=0 } = pageObj || {};
	const [page, setPage] = useState(pageNo);

	useEffect(() => {
		if (page && headingToggle) {
			refetchHsCode(headCode, page);
		}
	}, [page]);

	return (
		<div className={styles.pagination_wrapper}>
			{totalRecords > 7
			&& (
				<Pagination
					className="md"
					type="number"
					currentPage={page}
					totalItems={totalRecords}
					pageSize={7}
					// pageSize={4}
					onPageChange={setPage}
				/>
			)}
		</div>
	);
}

export default Paginations;
