import { cl } from '@cogoport/components';
import React from 'react';

import QuickSearch from '../../Section/QuickSearch';

import styles from './styles.module.css';

function Status({ data, mobile }) {
	return (
		<div className={cl`${styles.container}${mobile ? styles.mobile : ''}`}>
			<QuickSearch
				data={data}
				mobile={mobile}
				extraParams={{
					importer_exporter_branch_id : data?.importer_exporter_branch_id,
					user_id                     : data?.user_id,
				}}
			/>
		</div>
	);
}

export default Status;
