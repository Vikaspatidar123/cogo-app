import ApplicationProcessed from '../ApplicationProcessed';
import BasicDetailsForm from '../BasicDetailsForm';
import CompanyInformation from '../CompanyInformation';
import Documentation from '../Documentation';
import FinancialAssessment from '../FinancialAssessment';
import PayLaterLive from '../PayLaterLive';
import RejectedApplication from '../RejectedApplication';

import styles from './styles.module.css';

const RENDERING_FORM = {
	awaiting_user_inputs : BasicDetailsForm,
	payment_success      : CompanyInformation,
	locked               : Documentation,
	rejected             : RejectedApplication,
	processing           : ApplicationProcessed,
	finance_assessment   : FinancialAssessment,
	live                 : PayLaterLive,
	default              : null,
};

function Form({ active = {}, getCreditRequestResponse = {}, refetch = () => {} }) {
	const Component = RENDERING_FORM[active] || RENDERING_FORM.default;
	return (
		<div className={styles.form}>
			<Component getCreditRequestResponse={getCreditRequestResponse} refetch={refetch} />
		</div>
	);
}

export default Form;
