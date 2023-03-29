import withControl from '@cogo/business-modules/form/components/Controlled/withControl';
import { Input, CheckboxGroup } from '@cogoport/components';

import ErrorMessage from './ErrorMessage';
import styles from './styles.module.css';

import { SelectController } from '@/packages/forms';
import TextAreaController from '@/packages/forms/Controlled/TextAreaController';

function DislikeFeedbackModalFormElements({
	showElements,
	formValues,
	errors,
	fields,
}) {
	const {
		feedbacks,
		preferred_freight_rate,
		preferred_freight_rate_currency,
		...rest
	} = fields;

	const getElement = (type) => {
		switch (type) {
			case 'number':
				return Input;
			case 'select':
				return SelectController;
			case 'text':
				return TextAreaController;
			default:
				return null;
		}
	};

	const Checkbox = withControl(CheckboxGroup);

	return (
		<div className={styles.container}>
			<div className={styles.group}>
				<div className={styles.label}>{fields.feedbacks.label}</div>
				<Checkbox {...fields.feedbacks} />
				<ErrorMessage message={errors.feedbacks?.message} />
			</div>

			{(formValues.feedbacks || []).includes('unsatisfactory_rate') ? (
				<div className={styles.group}>
					<div className={styles.label}>{fields.preferred_freight_rate.label}</div>
					<div className={styles.price}>
						<SelectController {...fields.preferred_freight_rate_currency} />
						<Input {...fields.preferred_freight_rate} />
					</div>
					<ErrorMessage
						message={
							errors.preferred_freight_rate?.message
							|| errors.preferred_freight_rate_currency?.message
						}
					/>
				</div>
			) : null}

			{Object.values(rest).map((field) => {
				const Element = getElement(field.type);

				if (!showElements[field.name]) {
					return null;
				}

				return (
					<div className={styles.group} key={field.name}>
						<div className={styles.label}>{field.label}</div>
						<Element {...field} />
						<ErrorMessage message={errors[field.name]?.message} />
					</div>
				);
			})}
		</div>
	);
}

export default DislikeFeedbackModalFormElements;
