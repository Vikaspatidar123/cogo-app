import { Controller } from 'react-hook-form';

import NewPriceSelect from '../Business/NewPriceSelect';

function PriceSelectContriller({
	itemKey,
	name,
	value,
	control,
	mobileSelectRef,
	...rest
}) {
	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<NewPriceSelect
					mobileSelectRef={mobileSelectRef}
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
export default PriceSelectContriller;
