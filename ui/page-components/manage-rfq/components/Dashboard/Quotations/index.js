import { Button, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useGetRfqList from '../../../hooks/useGetRfqList';

import Filters from './Filters';
import QuotationList from './QuotationList';
import styles from './styles.module.css';

function Quotations({
	scrollRef,
	getRfqStats,
	setShowDashboard,
	inViewport,
}) {
	const [activeFilter, setActiveFilter] = useState('all');

	const {
		rfqList,
		loading,
		pageData,
		setPagination,
		getRfqList,
		debounceQuery,
		stats,
	} = useGetRfqList({
		activeFilter,
	});

	const { page, total_count } = pageData || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>My Quotations</div>
				{inViewport && !isEmpty(rfqList) && (
					<Button
						onClick={() => setShowDashboard(false)}
					>
						Request RFQ
					</Button>
				)}
			</div>

			<Filters
				activeFilter={activeFilter}
				setActiveFilter={setActiveFilter}
				debounceQuery={debounceQuery}
				setPagination={setPagination}
				stats={stats}
			/>

			<QuotationList
				rfqList={rfqList}
				loading={loading}
				inViewport={inViewport}
				getRfqList={getRfqList}
				getRfqStats={getRfqStats}
				activeFilter={activeFilter}
				setShowDashboard={setShowDashboard}
			/>

			<div ref={scrollRef}>
				<div className={styles.pagination_container}>
					{!isEmpty(rfqList) && (
						<Pagination
							type="compact"
							currentPage={page}
							totalItems={total_count}
							pageSize={10}
							onPageChange={setPagination}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Quotations;
