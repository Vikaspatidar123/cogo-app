import { Table } from '@cogoport/components';

import styles from '../HsTag/styles.module.css';

function HsTable({
	columns, data, loading, callbackFn,
}) {
	console.log('ccccccccc', data, columns);
	return (
	// <Table
	// 	className="tables"
	// 	columns={columns || []}
	// 	data={data || []}
	// 	fixedHeader
	// 	theme="admin"
	// 	selectType="single"
	// 	onRowSelect={() => {}}
	// 	loading={loading}
	// 	onRowClick={(row) => callbackFn(row)}
	// />

		data?.map((item) => (
			<div role="presentation" className={styles.table_div} onClick={(row) => callbackFn(row)}>
				<div>
					{item.sectionCode}
				</div>
				<div>
					{item.sectionDescription}
				</div>
			</div>
		))
	);
}

export default HsTable;
