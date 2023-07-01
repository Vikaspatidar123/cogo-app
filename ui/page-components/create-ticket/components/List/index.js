import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../EmptyState';
import ListItem from '../ListItem';
import MobileListItem from '../MobileListItem';

import ListHeader from './ListHeader';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function List({
	data = {},
	fields,
	loading = false,
	params = {},
	setParams = () => {},
	setOrderBy = () => {},
	orderBy = {},
	showPagination = true,
	handleCheckboxSelect = () => {},
	selectedInvoices = {},
	selectedpayments,
	handleBoxSelect,
}) {
	const { isMobile } = useSelector(({ general }) => ({
		isMobile: general.isMobile,
	}));
	const { list = [], ...paginationData } = data || {};
	const { page_limit, total_count, page } = paginationData || {};
	const listNew = loading ? [{}, {}, {}, {}, {}, {}, {}, {}, {}] : list || [];
	return (
		<div className={styles.container}>
			<ListHeader
				fields={fields}
				setOrderBy={setOrderBy}
				setParams={setParams}
				params={params}
				orderBy={orderBy}
			/>
			{isEmpty(list) && !loading ? (
				<EmptyState containerHeight="300px" />
			) : (
				<div>
					{(listNew || []).map((item) => {
						if (isMobile) {
							return (
								<MobileListItem
									key={item?.id}
									item={item}
									fields={fields}
									loading={loading}
									handleCheckboxSelect={handleCheckboxSelect}
									selectedInvoices={selectedInvoices}
									handleBoxSelect={handleBoxSelect}
									selectedpayments={selectedpayments}
								/>
							);
						}
						return (
							<ListItem
								key={item?.id}
								item={item}
								fields={fields}
								loading={loading}
								handleCheckboxSelect={handleCheckboxSelect}
								selectedInvoices={selectedInvoices}
								handleBoxSelect={handleBoxSelect}
								selectedpayments={selectedpayments}
							/>
						);
					})}
				</div>
			)}
			{showPagination && (
				<div className={styles.card_div}>
					<div className={styles.pagination_wrapper}>
						<Pagination
							className="md"
							pageLimit={page_limit}
							pagination={page}
							total={total_count}
							setPagination={(val) => setParams({ ...params, page: val })}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default List;
