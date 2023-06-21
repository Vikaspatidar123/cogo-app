import { cl } from '@cogoport/components';
import React from 'react';

import QuickSearch from '../../Section/QuickSearch';

import styles from './styles.module.css';

function Status({ data }) {
	return (
		<div className={cl`${styles.container}`}>
			<QuickSearch
				data={data}
				extraParams={{
					importer_exporter_branch_id : data?.importer_exporter_branch_id,
					user_id                     : data?.user_id,
				}}
			/>
		</div>
	);
}

export default Status;
