import BasicDetails from '../BasicDetails';
import CompanyInformation from '../CompanyInformation';
import DirectorInformation from '../DirectorInformation';
import OfferLetterDetails from '../OfferLetterDetails';

import styles from './styles.module.css';

// const RENDERING_FORM = {
// 	awaiting_user_inputs : BasicDetailsForm,
// 	payment_success      : CompanyInformation,
// 	locked               : Documentation,
// 	rejected             : RejectedApplication,
// 	processing           : ApplicationProcessed,
// 	finance_assessment   : FinancialAssessment,
// 	approved             : PayLaterLive,
// };

function Form({ active = {}, getCreditRequestResponse = {}, refetch = () => {}, loading }) {
	// const Component = RENDERING_FORM[active];

	return (
		<div className={styles.form}>
			<DirectorInformation
				active={active}
				getCreditRequestResponse={getCreditRequestResponse}
				refetch={refetch}
				loading={loading}
			/>
		</div>
	);
}

export default Form;
