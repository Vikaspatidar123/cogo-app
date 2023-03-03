/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination } from '@cogoport/components';
import { useState, useEffect } from 'react';

import styles from '../../List/styles.module.css';

function Paginations({
	pageObj, refetchHsCode, headCode, headingToggle,
}) {
	// eslint-disable-next-line no-unused-vars
	const { totalRecords = 0, pageNo = 0, pageSize = 0 } = pageObj || {};
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
					onPageChange={setPage}
					pageSize={7}
				/>
			)}
		</div>
	);
}

export default Paginations;
