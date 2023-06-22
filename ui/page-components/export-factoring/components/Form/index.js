// import ApplicationProcessed from '../ApplicationProcessed';
// import BasicDetailsForm from '../BasicDetailsForm';
// import CompanyInformation from '../CompanyInformation';
// import Documentation from '../Documentation';
// import FinancialAssessment from '../FinancialAssessment';
// import PayLaterLive from '../PayLaterLive';
// import RejectedApplication from '../RejectedApplication';

import BankDetails from '../BankDetails/components/BankVerification';

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
			{/* <Component getCreditRequestResponse={getCreditRequestResponse} refetch={refetch} /> */}
			<BankDetails />
		</div>
	);
}

export default Form;
