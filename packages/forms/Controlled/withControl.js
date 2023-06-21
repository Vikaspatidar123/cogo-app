import React from 'react';
import { useController } from 'react-hook-form';

const withControl =	(Component) => function ({ name, control, ...rest }) {
	const {
		field: { ref, ...inputProps },
	} = useController({
		name,
		control,
		rules            : rest.rules,
		defaultValue     : rest.defaultValue,
		shouldUnregister : rest.shouldUnregister,
	});
	const { register, watch, value: restvalue, ...newRest } = rest || {};
	const { onChange, value } = inputProps || {};

	return (
		<Component
			{...newRest}
			onChange={(val, obj) => {
				onChange(val, obj);
				if (rest.handleChange && rest.type === 'select') {
					rest.handleChange(obj, name);
				}
			}}
			value={value || restvalue}
			inputRef={ref}
		/>
	);
};
export default withControl;
