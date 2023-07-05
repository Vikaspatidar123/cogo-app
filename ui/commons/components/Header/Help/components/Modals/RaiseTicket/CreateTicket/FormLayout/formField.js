import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

const translationKey = 'common:components_header_tickets_create';

function FormField({ fields, control, errors }) {
	const { t } = useTranslation(['common']);

	const { label, type, name } = fields;
	const Element = getField(type) || null;

	if (!Element) {
		return null;
	}

	return (
		<div className={styles.form_field_container} key={name}>
			<div className={styles.form_field_label}>{label}</div>
			<div>
				<Element {...fields} control={control} size="sm" />
			</div>
			<div className={styles.form_field_error}>
				{errors?.[name] && `${label} ${t(`${translationKey}_required`)}`}
			</div>
		</div>
	);
}

export default FormField;
