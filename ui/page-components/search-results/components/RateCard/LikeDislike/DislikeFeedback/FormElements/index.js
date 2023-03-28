import CheckboxGroup from '@cogo/business-modules/form/components/Business/Checkbox';
import Input from '@cogo/business-modules/form/components/Controlled/InputController';
import SelectController from '@cogo/business-modules/form/components/Controlled/SelectController';
import TextAreaController from '@cogo/business-modules/form/components/Controlled/TextareaControlled';
import withControl from '@cogo/business-modules/form/components/Controlled/withControl';

import ErrorMessage from './ErrorMessage';
import { Container, Label, Group, Price } from './styles';

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
		<Container>
			<Group>
				<Label>{fields.feedbacks.label}</Label>
				<Checkbox {...fields.feedbacks} />
				<ErrorMessage message={errors.feedbacks?.message} />
			</Group>

			{(formValues.feedbacks || []).includes('unsatisfactory_rate') ? (
				<Group>
					<Label>{fields.preferred_freight_rate.label}</Label>
					<Price>
						<SelectController {...fields.preferred_freight_rate_currency} />
						<Input {...fields.preferred_freight_rate} />
					</Price>
					<ErrorMessage
						message={
							errors.preferred_freight_rate?.message
							|| errors.preferred_freight_rate_currency?.message
						}
					/>
				</Group>
			) : null}

			{Object.values(rest).map((field) => {
				const Element = getElement(field.type);

				if (!showElements[field.name]) {
					return null;
				}

				return (
					<Group key={field.name}>
						<Label>{field.label}</Label>
						<Element {...field} />
						<ErrorMessage message={errors[field.name]?.message} />
					</Group>
				);
			})}
		</Container>
	);
}

export default DislikeFeedbackModalFormElements;
