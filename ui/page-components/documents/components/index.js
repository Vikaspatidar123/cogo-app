import { Table } from '@cogoport/components';
import { useState } from 'react';

import columns from '../config';
import useGetDocumentsList from '../hooks/useGetDocumentsList';

import Filters from './Filters';
import Heading from './Heading';

function Documents() {
	const [filters, setFilters] = useState({});
	const { data = {}, loading = false } = useGetDocumentsList({ filters });

	return (
		<div>
			<Heading />
			<Filters setFilters={setFilters} filters={filters} />
			<Table
				columns={columns}
				data={!loading ? data?.list : []}
				loading={loading}
				loadingRowsCount={6}
			/>
		</div>
	);
}

export default Documents;
