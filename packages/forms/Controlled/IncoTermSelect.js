import React from 'react';
import { Controller } from 'react-hook-form';

import IncotermSelect from '../Business/IncotermSelect';

function IncoTermSelectController({ itemKey, name, value, control, ...rest }) {
	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<IncotermSelect
					{...rest}
					key={itemKey}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default IncoTermSelectController;
