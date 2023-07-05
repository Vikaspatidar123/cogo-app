import { Loader, Button } from '@cogoport/components';
import { useState } from 'react';

import useGetCompanyFinanceData from '../../hooks/useGetCompanyFinanceData';

import CompanyDetails from './CompanyDetails';
import EditDetails from './EditDetails';
import styles from './styles.module.css';
import TurnoverDetails from './TurnoverDetails';

function CompanyInformation({ getCreditRequestResponse = {}, refetch = () => { } }) {
	const { data, loading } = useGetCompanyFinanceData({ id: getCreditRequestResponse?.id });
	const [showEdit, setShowEdit] = useState({ show: false, type: '' });
	const [updatedValues, setUpdatedValues] = useState({});

	if (loading || !data) {
		return (
			<div>
				<Loader />
			</div>
		);
	}

	return (
		<div>
			<CompanyDetails
				data={data}
				updatedValues={updatedValues}
				getCreditRequestResponse={getCreditRequestResponse}
				setShowEdit={setShowEdit}
			/>
			{(data.turn_over_slab.max_amount === 0) && (
				<div className={styles.turn_over_container}>
					<TurnoverDetails setUpdatedValues={setUpdatedValues} />
				</div>
			)}
			<div className={styles.btn_container}>
				<Button>Get Offer Letter</Button>
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
		</div>
	);
}

export default CompanyInformation;
