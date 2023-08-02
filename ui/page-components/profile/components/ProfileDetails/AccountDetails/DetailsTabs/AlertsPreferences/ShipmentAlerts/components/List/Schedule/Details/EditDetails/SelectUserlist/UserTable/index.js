import { Checkbox, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import Header from './Header';
import styles from './styles.module.css';

function UserTable({ data, setPageNumber, isLoading }) {
	const {
		list = [], page = 1, total_count,
		page_limit,
	} = data || {};
	const [value, setValue] = useState([]);

	const onCheck = ({ item }) => {
		if (!value.includes(item.id)) {
			setValue((prev) => [...prev, item.id]);
		} else {
			setValue((prev) => prev.filter((info) => info !== item.id));
		}
	};

	return (
		<div className={styles.container}>
			<Header setValue={setValue} list={list} />
			<div>
				{(list || []).map((item) => (
					<div className={styles.line_item} key={item?.id}>
						<div className={styles.checkbox}>
							<Checkbox
								onChange={() => onCheck({ item })}
								checked={value.includes(item.id)}
								loading={isLoading}
							/>
						</div>
						<div className={styles.box}>
							{item.name}
						</div>
						<div className={styles.box}>
							ok
						</div>
						<div className={styles.box}>
							{item.email}
						</div>
						<div className={styles.box}>
							{item.mobile_number}
						</div>
					</div>
				))}
				{!isEmpty(list) ? (
					<div className={styles.pagination}>
						<Pagination
							type="table"
							currentPage={page}
							totalItems={total_count}
							pageSize={page_limit}
							onPageChange={setPageNumber}
						/>

					</div>
				) : null}
			</div>
		</div>
	);
}

export default UserTable;
