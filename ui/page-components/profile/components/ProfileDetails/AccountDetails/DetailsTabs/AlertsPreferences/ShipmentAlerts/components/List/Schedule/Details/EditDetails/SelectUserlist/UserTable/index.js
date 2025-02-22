import { Checkbox, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import DESIGNATION from './configurations';
import Header from './Header';
import styles from './styles.module.css';

function UserTable({
	data = {},
	setPageNumber = () => {},
	isLoading = false,
	setUserIds = () => {},
	userIds = [],
}) {
	const {
		list = [], page = 1, total_count = 0,
		page_limit = 5,
	} = data || {};

	const { t } = useTranslation(['settings']);

	const onCheck = ({ item }) => {
		if (!userIds.includes(item?.user_id)) {
			setUserIds((prev) => [...prev, item?.user_id]);
		} else {
			setUserIds((prev) => prev.filter((info) => info !== item?.user_id));
		}
	};

	const DESIGNATION_MAPPING = DESIGNATION({ t });

	return (
		<div className={styles.container}>
			<Header setUserIds={setUserIds} list={list} />

			<div>
				{(list || []).map((item) => (
					<div className={styles.line_item} key={item?.user_id}>

						<div className={styles.checkbox}>
							<Checkbox
								onChange={() => onCheck({ item })}
								checked={userIds.includes(item?.user_id)}
								loading={isLoading}
							/>

						</div>

						<div className={styles.box}>
							{item?.name}
						</div>

						{!isEmpty(item?.work_scopes) ? (
							<div className={styles.box}>
								{DESIGNATION_MAPPING[item?.work_scopes]}
							</div>
						) : (
							<div className={styles.box}>-----</div>
						)}
						<div className={styles.box}>
							{item?.email}
						</div>
						<div className={styles.box}>
							{item?.mobile_number}
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
