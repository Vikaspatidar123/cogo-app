import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';
import React, { Fragment } from 'react';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';
import getWidth from '@/ui/page-components/checkout/utils/getWidth';

function Child({
	controls,
	control,
	field,
	index,
	name,
	remove,
	showElements = {},
	showDeleteButton = true,
	noDeleteButtonTill = 1,
	disabled = false,
	showButtons,
	vesselOptionsLength,
	fields,
	showAddIcon,
	handleAppendChild,
}) {
	return (
		<div
			style={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '10px' }}
			className={`form-fieldArray-content form-fieldArray-${name}-${index}`}
			key={field.id}
		>
			{controls.map((controlItem) => {
				const show = !(controlItem.name in showElements) || showElements[controlItem.name];

				const { span } = controlItem;

				const extraProps = {};
				if (controlItem.customProps) {
					Object.keys(controlItem.customProps).forEach((key) => {
						const newControlItem = controlItem;
						newControlItem[key] = controlItem.customProps[key][index];
					});
				} else if (controlItem.options) {
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

				const Element = getField(controlItem.type);

				if (!Element) return null;
				return (

					<div
						className={styles.col}

					>
						{controlItem.label ? <div>{controlItem.label}</div> : null}

						<Element
							style={{ width: '200px' }}
							{...controlItem}
							control={control}
							key={`${name}.${index}.${controlItem.name}`}
							id={`${name}.${index}.${controlItem.name}`}
							name={`${name}.${index}.${controlItem.name}`}
						/>
					</div>
				);
			})}

			{showButtons
			&& !disabled
			&& showAddIcon
			&& fields.length < vesselOptionsLength && (
				<div
					style={{
						alignItems: 'center',
					}}
					type="button"
					role="presentation"
					onClick={() => handleAppendChild()}
				>
					<IcMPlusInCircle
						className="form-field-array-add-btn"
						height={20}
						width={20}
					/>
				</div>
			)}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled && (
				<div
					type="button"
					role="presentation"
					onClick={() => remove(index, 1)}
				>
					<IcMDelete height={20} width={20} />
				</div>
			)}

		</div>
	);
}
export default Child;
