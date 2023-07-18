import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function RenderField({ item, errors, control }) {
	const { name, type, placeholder } = item || {};
	const Element = getField(type);

	return (
		<div className={styles.field} key={item.name}>
			<div>{placeholder}</div>
			<Element {...item} control={control} />
			{errors?.[name] && (
				<div className={styles.error_message}>
					{errors[name]?.message || errors[name]?.type}
				</div>
			)}
		</div>
	);
}

export default RenderField;
