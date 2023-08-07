import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
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
	buttonText = 'add more',
	showButtons = true,
	showLabelOnce = false,
	disabled = false,
	actionOnAdd = {},
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
	console.log(fields, 'fields', childEmptyValues);
	const handleAppendChild = () => {
		if (actionOnAdd && typeof actionOnAdd === 'function') {
			actionOnAdd({
				onSuccess: () => {
					append(childEmptyValues);
				},
			});
			return;
		}

		append(childEmptyValues);
	};

	if (isEmpty(fields)) {
		fields.push(childEmptyValues);
	}
	return (
		<div className={`${styles.container} field_array_container`}>
			{fields.map((field, index) => (
				<Child
					{...rest}
					key={`${field.id}_${name}`}
					field={field}
					index={index}
					control={control}
					controls={controls}
					name={name}
					remove={remove}
					error={error?.[index]}
					showElements={showElements?.[index]}
					disabled={disabled}
					length={fields.length}
					showLabelOnce={showLabelOnce}
				/>
			))}

			{showButtons && !disabled ? (
				<Button type="button" themeType="secondary" onClick={() => handleAppendChild()}>
					+
					{' '}
					{buttonText}
				</Button>
			) : null}
		</div>
	);
}

export default FieldArray;
