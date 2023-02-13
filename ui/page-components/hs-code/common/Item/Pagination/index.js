import { Pagination } from '@cogoport/components';
import { useState, useEffect } from 'react';

import styles from '../../List/styles.module.css';

function Paginations({
	pageObj, refetchHsCode, headCode, headingToggle,
}) {
	const { totalRecords = 0, pageNo = 0 } = pageObj || {};
	const [page, setPage] = useState(pageNo);

	useEffect(() => {
		if (page && headingToggle) {
			refetchHsCode(headCode, page);
		}
	}, [page]);

	return (
		<div className={styles.pagination_wrapper}>
			<Pagination
				className="md"
				pageRange={7}
				pageLimit={7}
				total={totalRecords}
				pagination={page}
				setPagination={setPage}
			/>
		</div>
	);
}

export default Paginations;
