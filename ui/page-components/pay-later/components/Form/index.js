import BasicDetailsForm from '../BasicDetailsForm';

import styles from './styles.module.css';

const RENDERING_FORM = {
	basic_details : BasicDetailsForm,
	default       : BasicDetailsForm,
};

function Form({ active = {} }) {
	const Component = RENDERING_FORM[active] || RENDERING_FORM.default;

	return (
		<div className={styles.form}>
			<Component />
		</div>
	);
}

export default Form;
