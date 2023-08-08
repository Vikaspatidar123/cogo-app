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
	disabled = false,
}) {
	return (
		<div className={styles.content}>
			{controls.map((controlItem) => {
				const Element = getField(controlItem.type);
				if (!Element) return null;
				return (
					<div className={styles.list}>
						<div className={styles.label}>{controlItem.label}</div>
						<Element
							{...controlItem}
							width="100%"
							control={control}
							key={`${name}.${index}.${controlItem.name}`}
							id={`${name}.${index}.${controlItem.name}`}
							name={`${name}.${index}.${controlItem.name}`}
						/>
					</div>
				);
			})}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<IcMDelete
					className={`form-fieldArray-${name}-remove`}
					onClick={() => remove(index, 1)}
					style={{ width: '2em', height: '2em', margin: '25px 10px 0px' }}
				/>
			) : null}
		</div>
	);
}
export default Child;
