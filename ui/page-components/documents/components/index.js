import { Table, Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import columns from '../config';
import useGetDocumentsList from '../hooks/useGetDocumentsList';

import styles from './styles.module.css';

function Documents() {
	const [filters, setFilters] = useState({});
	const { data = {}, loading = false } = useGetDocumentsList({ filters });

	return (
		<div>
			<div className={styles.search}>
				<div className={styles.input}>
					<Input
						placeholder="Search by document name"
						size="sm"
						prefix={<IcMSearchlight />}
						onChange={(e) => setFilters({
							query: e?.target.value,
						})}
					/>
				</div>
			</div>
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
