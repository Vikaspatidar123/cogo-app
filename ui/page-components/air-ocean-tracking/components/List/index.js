import { Pagination } from '@cogoport/components';

import useGetListTracker from '../../hooks/useGetListTracker';

import Card from './Card';
import Header from './Header';
import styles from './styles.module.css';

function List() {
	const {
	 	data,
		loading, globalFilter, inputValue, setInputValue, filterChangeHandler,
	} = useGetListTracker();

	const { list = [], filter_data = {}, page, page_limit, total_count } = data || {};

	const newList = loading ? [...Array(5).keys()] : list;

	return (
		<div className={styles.container}>
			<Header
				globalFilter={globalFilter}
				filterChangeHandler={filterChangeHandler}
				inputValue={inputValue}
				setInputValue={setInputValue}
			/>
			{(newList || []).map((listItem) => (
				<Card listItem={listItem} />
			))}
			<div className={styles.pagination_container}>
				<Pagination
					type="number"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={(e) => filterChangeHandler('page', e)}
				/>
			</div>
		</div>
	);
}

export default List;
