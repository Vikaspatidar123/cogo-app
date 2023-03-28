// import getField from '@cogo/business-modules/form/components';
// import React from 'react';

// import Message from './Message';
// import { Container, Label, LowerLabel, FormField } from './styles';
import Message from './Message';
import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

const getErrorMessage = ({ errorClass, error, rules, errorName, label }) => {
	const errorMessage = [];
	if (errorClass) {
		if (rules?.required && error.type === 'required') {
			if (error.message) {
				errorMessage.push(error.message);
			} else {
				errorMessage.push(`${errorName || label || 'This'} is Required`);
			}
		}
		if (rules?.min && error.type === 'min') {
			errorMessage.push(
				`${errorName || label || ''} cannot be less than ${rules.min}`,
			);
		}
		if (rules?.max && error.type === 'max') {
			errorMessage.push(
				`${errorName || label || ''} cannot be greater than ${rules.max}`,
			);
		}
		if (rules?.minLength && error.type === 'minLength') {
			errorMessage.push(
				`${errorName || label || ''} should be ${rules.minLength} long`,
			);
		}
		if (rules?.maxLength && error.type === 'maxLength') {
			errorMessage.push(
				`${errorName || label || ''} should be less than ${rules.maxLength}`,
			);
		}
	}
	if (errorMessage.length) {
		return errorMessage.join(' ,');
	}
	return error?.message;
};

function Item(props) {
	const {
		type,
		rules,
		error,
		errorName = '',
		id_prefix = null,
		themeType = 'admin',
	} = props || {};
	const Element = getField(type);
	console.log(type, 'type');
	const { label, lowerlabel } = props;
	const errorClass = error ? 'error' : null;

	const newProps = {};

	if (id_prefix) {
		// eslint-disable-next-line react/destructuring-assignment
		newProps.id = `${id_prefix}_${props.name}`;
	}

	const errorOriginal = getErrorMessage({
		errorClass,
		error,
		rules,
		errorName,
		label,
	});

	let theme = null;
	if (themeType === 'admin') {
		theme = 'admin';
	}

	return (
		<div className={`${styles.container} ${styles.form_item_container} ${styles.errorClass || ''}`}>
			{label ? (
				<div className={styles.label}>{label || lowerlabel}</div>
			) : null}

			<div>
				{/* <Element {...newProps} {...props} /> */}

				{lowerlabel && (
					<div className={styles.lower_label}>{lowerlabel}</div>
				)}

				{theme !== 'admin'
				|| ![
					'select',
					'text',
					'input',
					'number',
					'email',
					'creatable-select',
				].includes(type) ? (
					<Message className="err_msz" text={errorOriginal} />
					) : null}
			</div>
		</div>
	);
}

export default Item;
