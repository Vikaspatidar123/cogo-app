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
<<<<<<< HEAD
						if (rest.onChange) {
							rest.onChange(obj, name);
=======
						if (rest?.handleChange) {
							rest?.handleChange(obj);
>>>>>>> 625f986b193667d84e6a95c61aa89593a2b53fd2
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
