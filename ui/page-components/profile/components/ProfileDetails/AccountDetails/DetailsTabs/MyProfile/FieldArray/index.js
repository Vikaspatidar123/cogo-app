import { Button } from '@cogoport/components';
import React from 'react';

import Child from './child';
import styles from './styles.module.css';

import { useFieldArray } from '@/packages/forms';

function FieldArray({
	name,
	control,
	controls,
	error,
	showElements,
	buttonText,
	showButtons = true,
	disabled = false,
	value,
	...rest
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'alternate_mobile_numbers',
	});

	const childEmptyValues = {};
	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});
	return (
		<div className={styles.container}>
			{fields.map((field, index) => (
				<Child
					{...rest}
					key={field.id}
					field={field}
					index={index}
					control={control}
					controls={controls}
					name={`alternate_mobile_numbers.${index}.value`}
					remove={remove}
					error={error?.[index]}
					showElements={showElements?.[index]}
					disabled={disabled}
					value={value}
				/>
			))}

			{showButtons && !disabled ? (
				<Button size="md" themeType="linkUi" onClick={() => append(childEmptyValues)}>
					+ ADD MORE
				</Button>
			) : null}
		</div>
	);
}

export default FieldArray;
