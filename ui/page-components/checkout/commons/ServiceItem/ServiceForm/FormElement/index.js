import ErrorMessage from '../../../../utils/error-message';

import styles from './styles.module.css';

import { InputController, SelectController } from '@/packages/forms';
import TextAreaController from '@/packages/forms/Controlled/TextAreaController';

function SearchResultsServiceItemFormElement({ field, errors }) {
	return (
		<div className={styles.container}>
			<div className={styles.label}>{field.label}</div>
			<div>
				{/* {field.type === 'pills' && <PillsControlled {...field} />} */}
				{/* {field.type === 'location-select' && <ControlledLocation {...field} />} */}
				{field.type === 'select' && <SelectController {...field} />}
				{field.type === 'number' && <InputController {...field} />}
				{field.type === 'textarea' && <TextAreaController {...field} />}
			</div>
			<ErrorMessage message={errors[field.name]?.message} />
		</div>
	);
}

export default SearchResultsServiceItemFormElement;
