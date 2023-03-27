import React from 'react';
import SelectOrg from '@cogo/partner-search/components/SelectOrganization';
import { Container, Label } from './styles';

const SwitchUsers = ({
	importer_exporter_details = {},
	setImporterExporterDetails = () => {},
	showEdit = false,
	service,
}) => {
	return (
		<Container>
			<Label>Type to search</Label>

			<SelectOrg
				importer_exporter_details={importer_exporter_details}
				setImporterExporterDetails={setImporterExporterDetails}
				className="small"
				disabled={!showEdit}
				service={service}
				search_type="results"
			/>
		</Container>
	);
};

export default SwitchUsers;
