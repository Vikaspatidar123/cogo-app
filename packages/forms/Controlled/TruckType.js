// import TruckType from '@cogo/smart-components/components/SelectTruckType';
// import { Controller } from '@cogoport/front/hooks';
// import React from 'react';

import { Controller } from 'react-hook-form';

import SelectTruckTypes from '@/ui/commons/components/SelectTruckType';

function InputController({ itemKey, name, value, control, ...rest }) {
	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<SelectTruckTypes
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
export default InputController;
