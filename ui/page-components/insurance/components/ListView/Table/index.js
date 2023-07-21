import { Table, Chips } from '@cogoport/components';

import NoData from '../../../common/NoData';
import segementedOpt from '../Options/index';
import styles from '../styles.module.css';

function TableComponent({
	loading,
	fields,
	list,
	summaryData,
	activeTab,
	handleTabChange,
	data,
}) {
	return (
		<>
			<div className={styles.segment_faq}>
				<Chips
					size="lg"
					items={segementedOpt(summaryData, activeTab)}
					selectedItems={activeTab}
					onItemChange={handleTabChange}
					className={styles.chips}
				/>
			</div>
			{data?.list?.length > 0 ? (
				<div className={styles.tables_wrapper}>
					<Table
						columns={fields || []}
						data={list || []}
						loading={loading}
						loadingRowsCount={10}
						className={styles.table}
						type="block"
					/>
				</div>
			) : <NoData />}
		</>
	);
}

export default TableComponent;
