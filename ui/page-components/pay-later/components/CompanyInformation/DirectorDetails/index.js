import TermsAndConditions from '../TermsAndConditions';

import Details from './Details';
import styles from './styles.module.css';

function DirectorDetails({
	data = {},
	getCreditRequestResponse = {},
	refetch = () => {},
	setShowEdit = () => {},
	updatedValues = {},
}) {
	const { directors = [] } = data || {};
	return (
		<div className={styles.director_details}>
			<div className={styles.heading}>Director Details</div>
			<div className={styles.sub_heading}>Edit and verify your director details</div>
			{(directors || []).map((director) => (
				<Details
					director={director}
					key={director.name}
					setShowEdit={setShowEdit}
				/>
			))}
			<TermsAndConditions
				getCreditRequestResponse={getCreditRequestResponse}
				companyAddress={data}
				directors={directors}
				refetch={refetch}
				updatedValues={updatedValues}
			/>
		</div>
	);
}

export default DirectorDetails;
