import { Datepicker } from '@cogoport/components';
import React from 'react';
import { Controller } from 'react-hook-form';

function DatepickerController(props) {
	const {
		name, control, minDate, rules, value, ...rest
	} = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			defaultValue={value}
			render={({ field: { onChange, onBlur, value:newValue } }) => (
				<Datepicker
					{...rest}
					minDate={minDate}
					key={rest.id}
					onChange={onChange}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default DatepickerController;
