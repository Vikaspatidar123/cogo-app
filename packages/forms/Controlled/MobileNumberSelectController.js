import { Controller } from 'react-hook-form';

import MobileNumberSelect from '../Business/SelectMobileNumber';
import MobileNumberSelect2 from '../Business/SelectMobileNumber2';

function MobileNumberSelectController({
	itemKey,
	name,
	value,
	control,
	mobileSelectRef,
	isInputGroup = false,
	...rest
}) {
	const Element = isInputGroup ? MobileNumberSelect2 : MobileNumberSelect;
	return (
		<Controller
			key={itemKey}
			control={control}
			name={name}
			defaultValue={value}
			rules={rest.rules}
			shouldUnregister={rest.shouldUnregister}
			render={({ field: { onChange, onBlur, value: newValue } }) => (
				<Element
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
export default MobileNumberSelectController;
