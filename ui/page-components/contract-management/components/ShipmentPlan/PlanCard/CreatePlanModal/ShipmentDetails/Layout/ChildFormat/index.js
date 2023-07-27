import { isEmpty } from '@cogoport/utils';
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
		vesselOptionsLength,
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
	if (isEmpty(fields)) {
		handleAppendChild();
	}
	useImperativeHandle(ref, () => ({ handleAppendChild, remove }));

	return (
		<div className={`form-fields-${name}`}>
			{fields.map((field, index) => (
				<Child
					{...rest}
					key={field.id}
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
					vesselOptionsLength={vesselOptionsLength}
				/>
			))}
		</div>
	);
}

export default forwardRef(ChildFormat);
