import { Pagination, cl } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import { useState } from 'react';

import statusFilter from '../../../configurations/status-filter';
import useGetListContracts from '../../../hooks/useGetContractList';

import Filters from './Filters';
import Quotations from './QuotationList';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Contracts({ data }) {
	const { query } = useRouter();
	const { activeTab = '' } = query || {};
	const [filterValue, setFilterValue] = useState('');
	const [activeFilter, setActiveFilter] = useState(activeTab || 'all');

	const {
		contractList,
		loading,
		pageData,
		setPagination = () => { },
	} = useGetListContracts({ filterValue, activeFilter });

	const { total_count, page } = pageData || {};

	const { active, expired, pending_approval } = data || {};

	const activeCount = active?.count;
	const PendingCount = pending_approval?.count;
	const expiredCount = expired?.count;

	const statCount = {
		active: activeCount,
		expired: expiredCount,
		pending_approval: PendingCount,
		all: activeCount + PendingCount + expiredCount,
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>My Contracts</div>
			<div className={styles.header}>
				<div className={styles.tags}>
					{statusFilter.map(({ label, key }) => (
						<div
							className={cl`${styles.tag} ${key === activeFilter && styles.active}`}
							role="presentation"
							onClick={() => {
								setActiveFilter(key);
								setPagination(1);
							}}
						>
							{key === activeFilter && <IcMTick />}
							<div>
								{label}
								{' '}
								(
								{statCount[key] || 0}
								)
							</div>
						</div>
					))}
				</div>
				<Filters filterValue={filterValue} setFilterValue={setFilterValue} />
			</div>

			<Quotations
				contractList={contractList}
				loading={loading}
				activeFilter={activeFilter}
			/>

			<div className={styles.pagination_wrap}>
				<Pagination
					type="table"
					currentPage={page}
					pageSize={5}
					totalItems={total_count}
					onPageChange={(e) => setPagination(e)}
				/>
			</div>
		</div>
	);
}

export default Contracts;
