import { cl } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';

import Item from '../Item';

import styles from './styles.module.css';

import getwidth from '@/ui/page-components/manage-rfq/utils/getWidth';

function Child({
	controls,
	control,
	register,
	field,
	index,
	name,
	remove,
	error,
	showElements = {},
	showLastDivider,
	showDivider,
	deletePosition,
	formValues,
	disabled = false,
	showDeleteAlways = false,
	noDeleteButtonTill = 1,
}) {
	const formValueIndex = formValues?.[index] || {};

	const renderDelete = () => <IcMDelete className={styles.delete_icon} onClick={() => remove(index, 1)} />;
	const formClassName = `form_fieldArray_${name}_${index}`;
	return (
		<div
			className={cl`${styles.item_container_with_button} ${styles[formClassName]}`}
			key={field.id}
		>
			<div className={styles.row}>
				{(deletePosition === 'front' && renderDelete()) || null}
				{(controls || []).map((controlItem) => {
					const { span = 6, watch = true } = controlItem;
					const show =						!(controlItem.name in showElements)
						|| showElements[controlItem.name];

					const extraProps = {};
					if (controlItem.options) {
						if (Array.isArray(controlItem.options)) {
							extraProps.options = controlItem.options;
						} else {
							extraProps.options = controlItem.options[index];
						}
					}

					if (Array.isArray(controlItem.itemsDisabled)) {
						const newControlItem = controlItem;
						newControlItem.disabled = controlItem.itemsDisabled[index];
					}

					if (watch) {
						return show ? (
							<div
								className={styles.col}
								style={{ width: getwidth(span || 12) }}
							>
								<Item
									{...controlItem}
									{...extraProps}
									key={`${name}.${index}.${controlItem.name}`}
									itemKey={`${name}.${index}.${controlItem.name}`}
									control={control}
									name={`${name}.${index}.${controlItem.name}`}
									value={field[controlItem.name]}
									error={error?.[controlItem.name]}
									formValue={formValueIndex[controlItem.name]}
									disabled={controlItem.disabled || disabled}
								/>
							</div>
						) : null;
					}

					return show ? (
						<div
							className={styles.col}
							style={{ width: getwidth(span || 12) }}
						>
							<Item
								{...controlItem}
								{...extraProps}
								key={`${name}.${index}.${controlItem.name}`}
								{...register(`${name}.${index}.${controlItem.name}`, {
									...(controlItem.rules || {}),
								})}
								defaultValue={field[controlItem.name]}
								error={error?.[controlItem.name]}
								formValue={formValueIndex[controlItem.name]}
								disabled={disabled}
							/>
						</div>
					) : null;
				})}
				{showDeleteAlways
				|| (index >= noDeleteButtonTill
					&& index !== 0
					&& deletePosition !== 'front')
					? renderDelete()
					: null}
			</div>

			{showLastDivider && showDivider && deletePosition !== 'front' && (
				<div className={styles.divider} />
			)}
		</div>
	);
}
export default Child;
