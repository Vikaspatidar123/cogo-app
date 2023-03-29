import SelectOrg from '@cogo/partner-search/components/SelectOrganization';
import React from 'react';

import styles from './styles.module.css';

function SwitchUsers({
	importer_exporter_details = {},
	setImporterExporterDetails = () => {},
	showEdit = false,
	service,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.label}>Type to search</div>

			<SelectOrg
				importer_exporter_details={importer_exporter_details}
				setImporterExporterDetails={setImporterExporterDetails}
				className="small"
				disabled={!showEdit}
				service={service}
				search_type="results"
			/>
		</div>
	);
}

export default SwitchUsers;
