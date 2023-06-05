import { Controller } from 'react-hook-form';

import AsyncSelect from '../Business/AsyncSelect';

function AsyncSelectController(props) {
	const { name, control, rules, value, ...rest } = props;

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
							rest.handleChange(obj);
						}
					}}
					value={newValue}
					onBlur={onBlur}
				/>
			)}
		/>
	);
}
export default AsyncSelectController;
