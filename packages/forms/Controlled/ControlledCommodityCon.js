import React from 'react';
import { Controller } from 'react-hook-form';

import CommodityType from '../Business/CommodityType';

function SelectController({ itemKey, name, value, control, ...rest }) {
	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<CommodityType
					{...rest}
					key={itemKey}
					onChange={(val, obj) => {
						onChange(val, obj);
						if (rest.handleChange) { rest.handleChange(obj, name); }
					}}
					value={newValue || value}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default SelectController;
