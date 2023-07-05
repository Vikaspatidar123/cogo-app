import { Button } from '@cogoport/components';
import { useState } from 'react';

import useGetCompanyFinanceData from '../../hooks/useGetCompanyFinanceData';

import AddDirectorDetails from './AddDirectorDetails';
import Details from './Details';
import EditDetails from './EditDetails';
import FinancialReport from './FinancialReport';
import styles from './styles.module.css';

function DirectorInformation({
	getCreditRequestResponse = {},
	refetch = () => {},
}) {
	const [showEdit, setShowEdit] = useState({ show: false, type: '' });
	const [showAddDirectors, setShowAddDirectors] = useState(false);
	const { data, loading } = useGetCompanyFinanceData({ id: getCreditRequestResponse?.id });
	const { directors = [] } = data || {};
	const [updatedValues, setUpdatedValues] = useState({});

	return (
		<div className={styles.director_details}>
			<div className={styles.heading}>Director Details</div>
			<div className={styles.sub_heading}>
				Edit and verify your director details
				<Button onClick={setShowAddDirectors}>
					Add Directors
				</Button>
			</div>
			{(directors || []).map((director) => (
				<Details
					director={director}
					key={director.name}
					setShowEdit={setShowEdit}
				/>
			))}
			<div className={styles.financial_div}>
				<FinancialReport />
			</div>
			{showEdit && (
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
				/>
			)}
		</div>

	);
}

export default DirectorInformation;
