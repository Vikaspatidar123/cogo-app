
import BasicDetails from '../BasicDetails';

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

function Form({ active = {}, getCreditRequestResponse = {}, refetch = () => {} }) {
	// const Component = RENDERING_FORM[active];

	return (
		<div className={styles.form}>
			<BasicDetails
				active={active}
				getCreditRequestResponse={getCreditRequestResponse}
				refetch={refetch}
			/>
		</div>
	);
}

export default Form;
