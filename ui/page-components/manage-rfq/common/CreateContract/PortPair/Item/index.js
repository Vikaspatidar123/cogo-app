import { cl } from '@cogoport/components';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

const getErrorMessage = (props) => {
	const { errorClass, error, rules, errorName, label } = props;
	const errorMessage = [];

	if (errorClass) {
		if (rules?.required && error.type === 'required') {
			errorMessage.push(error?.message || `${errorName || label} is Required`);
		}
		if (rules?.required && error.type === 'min') {
			errorMessage.push(
				error?.message
					|| `${errorName || label} should have minimum value of 50`,
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
		childError,
		showOptional = true,
		errorName = '',
		name,
		itemKey,
		subLabel,
	} = props || {};
	const Element = getField(type);
	const optional = !rules?.required && showOptional ? '(OPTIONAL)' : null;
	const { label, miniLabel } = props;

	const errorClass = childError ? 'error' : null;
	const newProps = {};

	const errorOriginal = getErrorMessage({
		errorClass,
		error: childError,
		rules,
		errorName,
		label,
	});

	return (
		<div
			className={cl`${styles.container} ${styles.form_item_container}
            ${styles?.[errorClass]} ${subLabel ? styles.has_content : ''}
			${errorOriginal ? styles.error_class : styles.asd}`}
		>
			<div className={cl`${styles.label} ${styles.form_item_label}`}>
				{label}
				{optional && <div className={styles.optional}>*optional*</div>}
			</div>
			<Element
				key={itemKey || name}
				{...newProps}
				{...props}
				suffix={subLabel}
			/>

			<div className={styles.sublabel}>{miniLabel ? `${miniLabel}` : ' '}</div>
		</div>
	);
}

export default Item;
