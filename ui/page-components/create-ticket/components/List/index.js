import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../EmptyState';
import ListItem from '../ListItem';
import MobileListItem from '../MobileListItem';

import ListHeader from './ListHeader';
import styles from './styles.module.css';

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
	const { list = [], page_limit = 0, total_count = 0, page = 0 } = data || {};
	const listNew = loading ? [...Array(9).keys()] : list || [];
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
					{(listNew || []).map((item) => (
						<React.Fragment key={item?.id}>
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
						</React.Fragment>
					))}
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
