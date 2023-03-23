import React, { useImperativeHandle, forwardRef } from 'react';

import Child from './child';

import { useFieldArray } from '@/packages/forms';

function ChildFormat(
	{
		name,
		control,
		handleSubmit = () => {},
		controls,
		error,
		frequency,
		schedule,
		getValues = () => {},
		showButtons = true,
		disabled = false,
		contractServiceId,
		serviceType,
		freqCount,
		isEditPlan,
		...rest
	},
	ref,
) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const handleAppendChild = () => {
		append();
	};

	useImperativeHandle(ref, () => ({ handleAppendChild, remove }));
	console.log(fields, 'fiel');
	return (
		<div className={`form-fields-${name}`}>
			{fields.map((field, index) => (
				<Child
					{...rest}
					key={field.id}
					field={field}
					listLength={fields.length}
					index={index}
					control={control}
					controls={controls}
					name={name}
					schedule={schedule}
					remove={remove}
					frequency={frequency}
					handleSubmit={handleSubmit}
					error={error?.[index]}
					disabled={disabled}
					getValues={getValues}
					handleAppendChild={handleAppendChild}
					showButtons={showButtons}
					contractServiceId={contractServiceId}
					serviceType={serviceType}
					freqCount={freqCount}
					isEditPlan={isEditPlan}
				/>
			))}
		</div>
	);
}

export default forwardRef(ChildFormat);
