// import { useFieldArray } from '@cogoport/front/hooks';
import React from 'react';

import Child from './child';
import styles from './styles.module.css';

function ChildFormat({
	name,
	control,
	register,
	controls,
	errors,
	showElements,
	buttonText,
	showButtons = true,
	disabled = false,
	color = 'red',
	...rest
}) {
	// const { fields, append, remove } = useFieldArray({
	// 	control,
	// 	name,
	// });

	const error = errors.containerCalculator;
	const childEmptyValues = {};
	controls?.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

	return (
		<>
			<div className={styles.header}>
				<div>Type</div>
				<div>Product Name</div>
				<div>Length</div>
				<div>Width</div>
				<div>Height</div>
				<div>Weight</div>
				<div>Quantity</div>
				<div>Color</div>
			</div>
			<div className={`form-fieldArray-${name}`}>
				{fields.map((field, index) => (
					<Child
						{...rest}
						key={field.id}
						field={field}
						index={index}
						register={register}
						control={control}
						controls={controls}
						name={name}
						remove={remove}
						error={error?.[index]}
						showElements={showElements?.[index]}
						disabled={disabled}
						color={color}
					/>
				))}
			</div>
			{showButtons && !disabled ? (
				<div className={styles.text} onClick={() => append(childEmptyValues)}>
					<div className={styles.addIcon}>+</div>
					<div style={{ textDecoration: 'underline', marginRight: '0px' }}>
						{buttonText || 'ADD'}
					</div>
				</div>
			) : null}
		</>
	);
}

export default ChildFormat;
