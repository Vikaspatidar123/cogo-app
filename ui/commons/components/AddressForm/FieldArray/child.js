import { IcMDelete } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function Child({
	controls,
	control,
	index,
	name,
	remove,
	showDeleteButton = true,
	noDeleteButtonTill = 0,
	showElements = {},
	disabled = false,
	showLabelOnce = false,
	lowerlabel = '',
}) {
	return (
		<div className={styles.form_container} style={{ width: '100%' }}>
			<div className={styles.content}>
				{controls.map((controlItem) => {
					const { style, type } = controlItem;

					const show =						!(controlItem.name in showElements)
						|| showElements[controlItem.name];

					const Element = getField(type);
					if (!Element && !show) return null;

					return (
						<div
							className={styles.form_item}
							style={{ marginRight: '10px', ...style }}
							key={index}
						>
							<div className={styles.list}>
								{(showLabelOnce && index === 0 && controlItem.label)
								|| (!showLabelOnce && controlItem.label) ? (
									<div>{controlItem.label || lowerlabel}</div>
									) : null}

								<Element
									width="100%"
									key={`create_form_${controlItem.name}_${index}`}
									itemKey={`create_form_${controlItem.name}_${index}`}
									control={control}
									id={`create_form_${controlItem.name}_${index}`}
									{...controlItem}
									name={`${name}[${index}].${controlItem.name}`}
								/>
							</div>
						</div>
					);
				})}

				{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
					<IcMDelete
						className={`form-fieldArray-${name}-remove`}
						onClick={() => remove(index, 1)}
						style={{ width: '20px', height: '20px' }}
					/>
				) : null}
			</div>
		</div>
	);
}
export default Child;
