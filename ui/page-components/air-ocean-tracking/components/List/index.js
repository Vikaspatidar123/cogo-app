import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import useGetListTracker from '../../hooks/useGetListTracker';

import Card from './Card';
import Header from './Header';
import ModalList from './ModalList';
import styles from './styles.module.css';

function List() {
	const [modalInfo, setModalInfo] = useState({
		show: false,
	});
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
				<Card
					key={listItem?.id || listItem}
					listItem={listItem}
					loading={loading}
					setModalInfo={setModalInfo}
				/>
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
			<ModalList modalInfo={modalInfo} setModalInfo={setModalInfo} />
		</div>
	);
}

export default List;
