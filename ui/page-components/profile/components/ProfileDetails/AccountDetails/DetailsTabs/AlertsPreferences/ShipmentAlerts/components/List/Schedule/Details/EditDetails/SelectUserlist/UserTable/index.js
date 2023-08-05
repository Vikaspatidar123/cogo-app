import { Checkbox, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import Header from './Header';
import styles from './styles.module.css';

function UserTable({
	data, setPageNumber, isLoading,
	setUserIds,
	userIds,
}) {
	const {
		list = [], page = 1, total_count,
		page_limit,
	} = data || {};

	const onCheck = ({ item }) => {
		if (!userIds.includes(item.user_id)) {
			setUserIds((prev) => [...prev, item.user_id]);
		} else {
			setUserIds((prev) => prev.filter((info) => info !== item.user_id));
		}
	};

	return (
		<div className={styles.container}>
			<Header setUserIds={setUserIds} list={list} />
			<div>
				{(list || []).map((item) => (
					<div className={styles.line_item} key={item?.user_id}>
						<div className={styles.checkbox}>
							<Checkbox
								onChange={() => onCheck({ item })}
								checked={userIds.includes(item.user_id)}
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
