import ErrorMessage from '../../../../utils/error-message';

import styles from './styles.module.css';

import { InputController, SelectController, ChipsController, AsyncSelectController } from '@/packages/forms';
import TextAreaController from '@/packages/forms/Controlled/TextAreaController';

function SearchResultsServiceItemFormElement({ field, errors }) {
	return (
		<div className={styles.container}>
			<div className={styles.label}>{field.label}</div>
			<div>
				{field.type === 'chips' && <ChipsController {...field} />}
				{field.type === 'async_select' && <AsyncSelectController {...field} />}
				{field.type === 'select' && <SelectController {...field} />}
				{field.type === 'number' && <InputController {...field} />}
				{field.type === 'textarea' && <TextAreaController {...field} />}
			</div>
			<ErrorMessage message={errors[field.name]?.message} />
		</div>
	);
}

export default SearchResultsServiceItemFormElement;
