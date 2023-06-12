import TermsAndConditions from '../TermsAndConditions';

import Details from './Details';
import styles from './styles.module.css';

function DirectorDetails() {
	return (
		<div className={styles.director_details}>
			<div className={styles.heading}>Director Details</div>
			<div className={styles.sub_heading}>Edit and verify your director details</div>
			<Details />
			<TermsAndConditions />
		</div>
	);
}

export default DirectorDetails;
