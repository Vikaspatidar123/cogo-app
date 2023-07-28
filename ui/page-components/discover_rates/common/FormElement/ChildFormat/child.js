import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import getWidth from '../../SearchForm/utils/getWidth';
import Item from '../Item';

import styles from './styles.module.css';

function DeleteIcon({ remove, index }) {
	return <IcMDelete onClick={() => remove(index, 1)} className={styles.delete_icon} />;
}

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

	return (
		<div className={`form-fieldArray-${name}-${index}`} key={field.id}>
			<div className={styles.row}>
				{(deletePosition === 'front' && <DeleteIcon remove={remove} index={index} />) || null}

				{controls.map((controlItem) => {
					const { span = 6, watch = true, inlineLabel, type } = controlItem;

					const show = !(controlItem.name in showElements)
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

					if (type === 'hidden') return null;

					if (watch) {
						return show ? (
							<div className={styles.col} style={{ padding: '0px 6px', width: getWidth(span) }}>
								{inlineLabel && (
									<div>
										{inlineLabel}
									</div>
								)}
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
						<div className={styles.col} style={{ padding: '0px 6px', width: getWidth(span) }}>
							{inlineLabel && (
								<div>
									{inlineLabel}
								</div>
							)}
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
				{showDeleteAlways || (index >= noDeleteButtonTill && index !== 0 && deletePosition !== 'front')
					? <DeleteIcon remove={remove} index={index} />
					: null}
			</div>

			{showLastDivider && showDivider && deletePosition !== 'front' && (
				<div className={styles.divider} />
			)}
		</div>
	);
}
export default Child;
