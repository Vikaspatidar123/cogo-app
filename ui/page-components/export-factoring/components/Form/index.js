import ApplicationProcess from '../ApplicationProcess';
import BasicDetails from '../BasicDetails';
import Buyers from '../Buyers';
import CompanyInformation from '../CompanyInformation';
import DirectorInformation from '../DirectorInformation';
import Invoices from '../Invoices';
import OfferLetterDetails from '../OfferLetterDetails';
import { OfferLetterWaiting } from '../WaitingScreens';

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
			{/* <ApplicationProcess
				active={active}
				getCreditRequestResponse={getCreditRequestResponse}
				refetch={refetch}
				loading={loading}
			/> */}
			{/* <Buyers getCreditRequestResponse={getCreditRequestResponse} /> */}
			<Invoices getCreditRequestResponse={getCreditRequestResponse} />
		</div>
	);
}

export default Form;
