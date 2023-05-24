import { Toast } from '@cogoport/components';

const validateImporterExporterDetails = ({ importerExporterDetails }) => {
	const {
		id: importer_exporter_id,
		// branchId: importer_exporter_branch_id,
		userId: importer_exporter_user_id,
	} = importerExporterDetails || {};

	if (!importer_exporter_id) {
		Toast.warn('Please select shipper name', {
			autoClose : 1000,
			style     : { background: '#ffffff' },
		});

		return false;
	}

	if (!importer_exporter_user_id) {
		Toast.warn('Please select User', {
			autoClose : 1000,
			style     : { background: '#ffffff' },
		});

		return false;
	}

	return true;
};

export default validateImporterExporterDetails;
