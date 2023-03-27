import React, { forwardRef } from 'react';

import PortPairChild from './child';

import { useFieldArray } from '@/packages/forms';

function PortPair({
	portType,
	item,
	name,
	control,
	formData,
	error,
	...rest
}) {
	const { fields } = useFieldArray({
		control,
		name,
	});

	return (
		<div className={`form-fieldArray-${name}`}>
			{formData.map((formField, index) => {
				const { idx } = formField;
				return (
					<PortPairChild
						{...rest}
						error={error?.[idx]}
						portType={portType}
						item={formField}
						name={name}
						control={control}
						key={fields[idx].id}
						field={fields[idx]}
						index={idx}
						portIndex={index}
					/>
				);
			})}
		</div>
	);
}

export default forwardRef(PortPair);
