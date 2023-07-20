import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function Child({
	controls,
	control,
	index,
	name,
	remove,
	showElements = {},
	disabled = false,
	showLabelOnce = false,
	length = 0,
}) {
	return (
		<div className={styles.form_container} style={{ width: '100%' }}>
			<div className={styles.content}>
				{controls.map((controlItem) => {
					const { style, type } = controlItem;

					const show = !(controlItem.name in showElements) || showElements[controlItem.name];

					const Element = getField(type);
					if (!Element && !show) return null;

					const options = [];

					const finalProps = {
						...controlItem,
						...(!isEmpty(options) && { options }),
					};

					return (
						<div
							className={styles.form_item}
							key={index}
							style={style}
						>
							<div className={styles.list}>
								{(showLabelOnce && index === 0 && controlItem.label)
								|| (!showLabelOnce && controlItem.label) ? (
									<div className={styles.label}>{controlItem.label}</div>
									) : null}

								<Element
									width="100%"
									key={`create_form_${controlItem.name}_${index}`}
									itemKey={`create_form_${controlItem.name}_${index}`}
									control={control}
									id={`create_form_${controlItem.name}_${index}`}
									{...finalProps}
									name={`${name}[${index}].${controlItem.name}`}
								/>
							</div>
						</div>
					);
				})}

				{length >= 1 && !disabled ? (
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
