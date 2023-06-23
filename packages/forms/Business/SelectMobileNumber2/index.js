import { Input, InputGroup } from '@cogoport/components';

import SelectCountryCode from '../SelectCountryCode';

import styles from './styles.module.css';

function SelectMobileNumber({
	value = {},
	onChange,
	codeKey = 'country_code',
	mobileSelectRef,
	numberKey = 'number',
	width,
	id = 'select_phone',
	inputType = 'number',
	type = 'number',
	disable_country_code = false,
	codeKeyPlaceholder = 'Select',

	...rest
}) {
	const { [codeKey]: country_code = '', [numberKey]: number = '' } =	value || {};

	const handleCodeChange = (v) => {
		onChange({ ...(value || {}), [codeKey]: v });
	};

	const handleNumberChange = (e) => {
		onChange({ ...(value || {}), [numberKey]: e });
	};

	return (
		<InputGroup>
			<SelectCountryCode
				{...rest}
				className={styles.country_code}
				value={country_code || (value || {})[codeKey]}
				onChange={handleCodeChange}
				placeholder={codeKeyPlaceholder}
				showMessage={false}
				disabled={disable_country_code}
				inputId={`${id || ''}_${codeKey || 'country_code'}`}
			/>

			<Input
				{...rest}
				id={`${id || ''}_${numberKey || 'number'}`}
				name="mobile_number"
				ref={mobileSelectRef}
				className={styles.mobile_number}
				type={inputType || type}
				value={number || (value || {})[numberKey]}
				onChange={handleNumberChange}
			/>
		</InputGroup>
	);
}

export default SelectMobileNumber;
