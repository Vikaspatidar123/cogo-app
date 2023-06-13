import ApplicationProcessed from '../ApplicationProcessed';
import BasicDetailsForm from '../BasicDetailsForm';
import CompanyInformation from '../CompanyInformation';
import Documentation from '../Documentation';
import RejectedApplication from '../RejectedApplication';

import styles from './styles.module.css';

const RENDERING_FORM = {
	awaiting_user_inputs : BasicDetailsForm,
	payment_success      : CompanyInformation,
	locked               : Documentation,
	rejected             : RejectedApplication,
	processing           : ApplicationProcessed,
	default              : BasicDetailsForm,
};

function Form({ active = {}, getCreditRequestResponse = {} }) {
	const Component = RENDERING_FORM[active] || RENDERING_FORM.default;

	return (
		<div className={styles.form}>
			<Component getCreditRequestResponse={getCreditRequestResponse} />
		</div>
	);
}

export default Form;
