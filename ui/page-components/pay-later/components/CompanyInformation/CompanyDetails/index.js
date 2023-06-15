import Details from './Details';
import styles from './styles.module.css';

function CompanyDetails({ data = {} }) {
	return (
		<div>
			<div className={styles.heading}>Company Details</div>
			<div className={styles.sub_heading}>Edit and verify your company details</div>
			<Details data={data} />
		</div>
	);
}

export default CompanyDetails;
