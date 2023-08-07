import { Button, Toast } from '@cogoport/components';
import { useState } from 'react';

import useGetCompanyFinanceData from '../../hooks/useGetCompanyFinanceData';
import { useUpdateCredit } from '../../hooks/useUpdateCredit';

import AddDirectorDetails from './AddDirectorDetails';
import Details from './Details';
import EditDetails from './EditDetails';
import FinancialReport from './FinancialReport';
import styles from './styles.module.css';

function DirectorInformation({
	getCreditRequestResponse = {},
	refetch = () => {},
}) {
	const [showEdit, setShowEdit] = useState({ show: false, type: '', registration_number: '' });
	const [showAddDirectors, setShowAddDirectors] = useState(false);
	const { data = {} } = useGetCompanyFinanceData({ id: getCreditRequestResponse?.id });
	const { updateCredit, loading:updateCreditLoading } = useUpdateCredit();
	const { date_of_incorporation, directors = [], entity_id, constitution_of_business = '' } = data;
	const [updatedValues, setUpdatedValues] = useState({ director: [] });

	const constitutionMapping = {
		PROPRIETORSHIP: {
			label               : 'Proprietorship',
			identity_number     : 'CIN',
			share_percent_label : 'Proprietorship',
		},
		PARTNERSHIP: {
			label               : 'Partners',
			identity_number     : 'CIN',
			share_percent_label : 'Partnership',
		},
		'LIMITED LIABILITY PARTNERSHIP': {
			label               : 'Partners',
			identity_number     : 'CIN',
			share_percent_label : 'Partnership',
		},
		'PRIVATE LIMITED COMPANY': {
			label               : 'Directors',
			identity_number     : 'DIN',
			share_percent_label : 'Shareholding',
		},
		'PUBLIC LIMITED COMPANY': {
			label               : 'Directors',
			identity_number     : 'DIN',
			share_percent_label : 'Shareholding',
		},
	}[constitution_of_business];

	// Function to check if the total share holdings exceed 100
	function checkShareHoldersPercent(shareholders) {
		let totalShareHoldings = 0;

		shareholders.forEach((element) => {
			totalShareHoldings += parseFloat(element.shareholder_percentage);
		});

		// Check if total share holdings exceed 100
		if (totalShareHoldings > 100) {
			return false; // Share holdings exceed 100
		}

		return true; // Share holdings are within the limit
	}
	function removeDuplicatesByPan(values) {
		const panSet = new Set();
		const uniqueData = [];

		values.forEach((item) => {
			if (!panSet.has(item.pan)) {
				panSet.add(item.pan);
				uniqueData.push(item);
			}
		});
		return uniqueData;
	}

	const saveDirectorAndReport = async () => {
		const filterDirector = removeDuplicatesByPan(updatedValues.director);

		if (!checkShareHoldersPercent(filterDirector)) {
			Toast.error('Share holder percentage exceed 100 ');
			return false;
		}
		const financial_reports = updatedValues.financial_data.map((item) => ({
			start_year         : item.select_year.split('-')[0].trim(),
			end_year           : item.select_year.split('-')[1].trim(),
			document_url       : item.financial_report,
			document_extension : 'pdf',
			document_type      : 'financial_report',
		}));
		const itr_reports = updatedValues.financial_data.map((item) => ({
			start_year         : item.select_year.split('-')[0].trim(),
			end_year           : item.select_year.split('-')[1].trim(),
			document_url       : item.itr,
			document_extension : 'pdf',
			document_type      : 'income_tax_return',
		}));
		const final_report = financial_reports.concat(itr_reports);

		const payload = {
			credit_id                           : getCreditRequestResponse?.id,
			identity_number                     : data?.gst_number,
			get_cogoscore                       : true,
			export_factoring_service_attributes : {
				status            : 'locked',
				date_of_incorporation,
				entity_id,
				directors         : updatedValues.director,
				financial_reports : final_report,
			},
		};

		const resp = await updateCredit(payload);
		if (resp) {
			refetch();
		}
		return true;
	};

	const validateProcess = () => {
		const allValuesExist = ['director', 'financial_data']
			.every((key) => key in updatedValues && updatedValues[key]);
		return !allValuesExist;
	};

	return (
		<div className={styles.director_details}>
			<div className={styles.heading}>
				{constitutionMapping?.label}
				{' '}
				Details
			</div>
			<div className={styles.sub_heading}>
				Edit and verify your
				{' '}
				{constitutionMapping?.label}
				{' '}
				details
				<Button type="button" onClick={setShowAddDirectors}>
					Add
				</Button>
			</div>
			{(directors || []).map((director) => (
				<Details
					director={director}
					key={director.name}
					setShowEdit={setShowEdit}
					showEdit={showEdit}
					data={data}
					constitutionMapping={constitutionMapping}
					updatedValues={updatedValues}
				/>
			))}
			<div className={styles.financial_div}>
				<FinancialReport
					data={data}
					setUpdatedValues={setUpdatedValues}
					updatedValues={updatedValues}
				/>
			</div>
			{showEdit.show && (
				<EditDetails
					getCreditRequestResponse={getCreditRequestResponse}
					setShowEdit={setShowEdit}
					showEdit={showEdit}
					data={data}
					setUpdatedValues={setUpdatedValues}
					updatedValues={updatedValues}
					constitutionMapping={constitutionMapping}
				/>
			)}
			{showAddDirectors && (
				<AddDirectorDetails
					getCreditRequestResponse={getCreditRequestResponse}
					setShowAddDirectors={setShowAddDirectors}
					showAddDirectors={showAddDirectors}
					data={data}
					setUpdatedValues={setUpdatedValues}
					setShowEdit={setShowEdit}
					constitutionMapping={constitutionMapping}
				/>
			)}
			<div className={styles.btn_container}>
				<Button
					type="button"
					onClick={saveDirectorAndReport}
					loading={updateCreditLoading}
					disabled={validateProcess()}
				>
					Save & Continue
				</Button>
			</div>
		</div>

	);
}

export default DirectorInformation;
