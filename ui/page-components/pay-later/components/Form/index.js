import BasicDetailsForm from '../BasicDetailsForm';

import styles from './styles.module.css';

const RENDERING_FORM = {
	awaiting_user_inputs : BasicDetailsForm,
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
