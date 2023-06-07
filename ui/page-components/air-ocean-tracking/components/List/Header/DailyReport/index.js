import { cl, Button, Pagination } from '@cogoport/components';
import { useState } from 'react';

import dailyStatusConfig from '../../../../configuration/dailyStatusConfig';
import useGetDsrList from '../../../../hooks/useGetDsrList';

import Item from './Item';
import StatusModal from './StatusModal';
import styles from './styles.module.css';

function DailyReport() {
	const [statusModal, setStatusModal] = useState(false);
	const { data, loading, setPage } = useGetDsrList();
	const { list = [], page = 0, total_count = 0, page_limit = 0 } = data || {};
	const newList = loading ? [...Array(5).keys()] : list;

	return (
		<div className={styles.container}>
			<div className={cl`${styles.flex_box} ${styles.header}`}>
				<h3>Schedule Status Reports to Contacts</h3>
				<Button themeType="accent" onClick={() => setStatusModal(true)}>Create New</Button>
			</div>
			<div className={styles.table}>
				<div className={cl`${styles.flex_box} ${styles.card_header}`}>
					{dailyStatusConfig.map((config) => (
						<div key={config.key} className={styles.col} style={{ width: config.width }}>
							{config.title}
						</div>
					))}
				</div>
				{newList.map((item) => (
					<div key={item?.id || item} className={styles.flex_box}>
						<Item data={item} loading={loading} />
					</div>
				))}
			</div>
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={setPage}
				/>
			</div>
			<StatusModal statusModal={statusModal} setStatusModal={setStatusModal} dsrList={list} />
		</div>
	);
}

export default DailyReport;
