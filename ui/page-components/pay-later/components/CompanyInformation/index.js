import { Loader } from '@cogoport/components';
import { useState } from 'react';

import useGetCompanyFinanceData from '../../hooks/useGetCompanyFinanceData';

import CompanyDetails from './CompanyDetails';
import DirectorDetails from './DirectorDetails';
import EditDetails from './EditDetails';
import styles from './styles.module.css';

function CompanyInformation({ getCreditRequestResponse = {}, refetch = () => {} }) {
	const { data, loading } = useGetCompanyFinanceData({ id: getCreditRequestResponse?.id });
	const [showEdit, setShowEdit] = useState({ show: false, type: '' });
	const [updatedValues, setUpdatedValues] = useState({});

	if (loading || !data) {
		return (
			<div className={styles.loader}>
				<Loader />
			</div>
		);
	}

	return (
		<div>
			<CompanyDetails data={data} setShowEdit={setShowEdit} />
			<DirectorDetails
				data={data}
				getCreditRequestResponse={getCreditRequestResponse}
				refetch={refetch}
				setShowEdit={setShowEdit}
				updatedValues={updatedValues}
			/>
			{showEdit && (
				<EditDetails
					setShowEdit={setShowEdit}
					showEdit={showEdit}
					data={data}
					setUpdatedValues={setUpdatedValues}
				/>
			)}
		</div>
	);
}

export default CompanyInformation;
