import { Controller } from 'react-hook-form';

import AsyncSelect from '../Business/AsyncSelect';

function AsyncSelectController(props) {
	const { name, control, value, rules, ...rest } = props;

	return (
		<Controller
			key={rest.id}
			control={control}
			name={name}
			rules={rules}
			defaultValue={value}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<AsyncSelect
					{...rest}
					key={rest.id}
					onChange={(val, obj) => {
          	onChange(val, obj);
          	if (rest?.handleChange) {
          		rest?.handleChange(obj);
          	}
					}}
					value={newValue}
					onBlur={onBlur}
					data-test-value={value}
				/>
			)}
		/>
	);
}
export default AsyncSelectController;
