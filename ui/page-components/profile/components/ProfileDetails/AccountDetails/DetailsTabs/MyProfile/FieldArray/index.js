import { Button } from '@cogoport/components';
import React, { useEffect } from 'react';

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
	setValue,
	...rest
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const childEmptyValues = {};
	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});
	useEffect(() => {
		setValue('alternate_mobile_numbers', value);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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
					name={name}
					remove={remove}
					error={error?.[index]}
					showElements={showElements?.[index]}
					disabled={disabled}
					value={value}
				/>
			))}

			{showButtons && !disabled ? (
				<Button
					size="md"
					themeType="linkUi"
					onClick={() => append(childEmptyValues)}
				>
					+ ADD MORE
				</Button>
			) : null}
		</div>
	);
}

export default FieldArray;
