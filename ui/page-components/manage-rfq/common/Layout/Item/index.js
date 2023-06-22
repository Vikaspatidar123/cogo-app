import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

const getErrorMessage = (props) => {
	const { errorClass, error, rules, errorName, label, inlineLabel } = props;
	const errorMessage = [];

	if (errorClass) {
		if (rules?.required && error.type === 'required') {
			errorMessage.push(
				error?.message || `${errorName || label || inlineLabel} is Required`,
			);
		}
		if ((rules?.min || rules?.min === 0) && error.type === 'min') {
			errorMessage.push(
				`${errorName || label || inlineLabel} cannot be less than ${rules.min}`,
			);
		}
		if (rules?.max && error.type === 'max') {
			errorMessage.push(
				`${errorName || label || inlineLabel} cannot be greater than ${
					rules.max
				}`,
			);
		}
		if (rules?.minLength && error.type === 'minLength') {
			errorMessage.push(
				`${errorName || label || inlineLabel} should be ${
					rules.minLength
				} character(s) long`,
			);
		}
		if (rules?.maxLength && error.type === 'maxLength') {
			errorMessage.push(
				`${errorName || label || inlineLabel} should be less than ${
					rules.maxLength
				}`,
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
		showOptional = true,
		errorName = '',
		id_prefix = null,
		themeType = '',
		index,
		showLabelOnce,
		showInlineLabelOnce,
		name,
		itemKey,
	} = props || {};

	const Element = getField(type);
	const optional = !rules?.required && showOptional ? '(OPTIONAL)' : null;
	const { label, lowerlabel, inlineLabel } = props;

	const errorClass = error ? 'error' : null;
	const newProps = {};
	// if (type === 'select' || type === 'creatable-select') {
	// 	newProps.style = SELECT_STYLES;
	// }
	// if (type === 'radio') {
	// 	newProps.style = RADIO_STYLES;
	// }
	// if (type === 'input') {
	// 	newProps.style = INPUT_STYLES;
	// }

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
		inlineLabel,
	});

	let theme = null;
	if (themeType === 'admin') {
		theme = 'admin';
	}

	// const isPillsType = (inlineLabel && type === 'pills') || false;

	return (
		<div className={styles.container}>
			{(showLabelOnce && index === 0 && label) || (!showLabelOnce && label) ? (
				<div className={styles.label}>
					{label || lowerlabel}
					<p className={styles.message}>{optional}</p>
				</div>
			) : null}

			{(showInlineLabelOnce && index === 0 && inlineLabel) || (!showInlineLabelOnce && inlineLabel) ? (
				<p className={styles.inlinelabel}>
					{inlineLabel || lowerlabel}
					{optional && <div className={styles.subtext}>(optional)</div>}
				</p>
			) : null}

			<Element
				key={itemKey || name}
				{...newProps}
				{...props}
				theme={theme}
				error={errorOriginal}
			/>
			{lowerlabel && (
				<div className={styles.lowerlabel}>{lowerlabel}</div>
			)}
			{errorOriginal && (
				<p className={styles.error}>{errorOriginal}</p>
			)}
		</div>
	);
}

export default Item;
