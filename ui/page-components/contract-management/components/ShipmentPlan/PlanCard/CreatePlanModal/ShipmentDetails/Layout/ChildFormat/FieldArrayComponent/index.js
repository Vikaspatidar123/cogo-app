import { isEmpty } from '@cogoport/utils';
import React, { useImperativeHandle, forwardRef } from 'react';
import { useFieldArray } from 'react-hook-form';

import Child from './child';

function FieldArrayComponent(
	{
		name,
		control,
		register,
		controls,
		error,
		showElements,
		buttonText,
		label,
		showButtons = true,
		showAddIcon = true,
		showLabelOnce = false,
		disabled = false,
		customLabels = [],
		vesselOptionsLength,
		actionOnAdd,
		span,
		...rest
	},
	ref,
) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const childEmptyValues = {};

	controls.forEach((controlItem) => {
		childEmptyValues[controlItem.name] = controlItem.value || '';
	});

	const handleAppendChild = () => {
		append(childEmptyValues);
	};

	useImperativeHandle(ref, () => ({ handleAppendChild, remove }));

	if (isEmpty(fields)) {
		handleAppendChild();
	}

	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{fields.map((field, index) => (
				<div key={field.id} style={{ display: 'flex' }}>
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
						customLabels={customLabels?.[index]}
						disabled={disabled}
						showLabelOnce={showLabelOnce}
						showButtons={showButtons}
						vesselOptionsLength={vesselOptionsLength}
						fields={fields}
						showAddIcon={showAddIcon}
						handleAppendChild={handleAppendChild}
					/>
				</div>
			))}

		</div>
	);
}

export default forwardRef(FieldArrayComponent);
