import { Table } from '@cogoport/components';

function HsTable({
	columns, data, loading, callbackFn,
}) {
	return (
		<Table
			className="tables"
			columns={columns || []}
			data={data || []}
			fixedHeader
			theme="admin"
			selectType="single"
			onRowSelect={() => {}}
			loading={loading}
			onRowClick={(row) => callbackFn(row)}
		/>
	);
}

export default HsTable;
