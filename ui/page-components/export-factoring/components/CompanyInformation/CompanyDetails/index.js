import Details from './Details';
import styles from './styles.module.css';

function CompanyDetails({ data = {}, setShowEdit = () => {}, getCreditRequestResponse = {}, updatedValues = {} }) {
	return (
		<div>
			<div className={styles.heading}>Company Details</div>
			<div className={styles.sub_heading}>Edit and verify your company details</div>
			<Details
				data={data}
				updatedValues={updatedValues}
				setShowEdit={setShowEdit}
				getCreditRequestResponse={getCreditRequestResponse}
			/>
		</div>
	);
}

export default CompanyDetails;
