import { Button } from '@cogoport/components';
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
	const { data = {}, loading } = useGetCompanyFinanceData({ id: getCreditRequestResponse?.id });
	const { updateCredit, loading:updateCreditLoading } = useUpdateCredit();
	const { date_of_incorporation, directors = [], entity_id, constitution_of_business = '' } = data;
	const [updatedValues, setUpdatedValues] = useState({});

	const constitutionMapping = {
		PROPRIETORSHIP: {
			label               : 'Proprietorship',
			identity_number     : 'CIN',
			share_percent_label : 'Partnership',
		},
		PARTNERSHIP: {
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

	const saveDirectorAndReport = async () => {
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
				status    : 'locked',
				date_of_incorporation,
				entity_id,
				directors : [
					updatedValues.director,
				],
				financial_reports: final_report,
			},
		};

		const resp = await updateCredit(payload);
		if (resp) {
			refetch();
		}
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
				<Button onClick={setShowAddDirectors}>
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

				/>
			)}
			{showAddDirectors && (
				<AddDirectorDetails
					getCreditRequestResponse={getCreditRequestResponse}
					setShowAddDirectors={setShowAddDirectors}
					showAddDirectors={showAddDirectors}
					data={data}
				/>
			)}
			<div className={styles.btn_container}>
				<Button onClick={saveDirectorAndReport} loading={updateCreditLoading} disabled={updateCreditLoading}>
					Save & Continue
				</Button>
			</div>
		</div>

	);
}

export default DirectorInformation;
