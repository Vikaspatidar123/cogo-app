import { MultiSelect, Select } from '@cogoport/components';

import getOptionsFromKey from './getOptionsFromKey';

function SelectController(props) {
	const {
		options = [],
		optionkey = '',
		multiple = false,
		valueKey,
		labelKey,
		...rest
	} = props;
	const Element = multiple ? MultiSelect : Select;

	let finalOptions = options || [];
	let finalValueKey = valueKey || 'value';
	let finalLabelKey = labelKey || 'label';

	if (optionkey) {
		const data = getOptionsFromKey(optionkey, { ...rest });
		finalOptions = data.options;
		finalValueKey = valueKey || data.valueKey;
		finalLabelKey = labelKey || data.labelKey;
	}

	return (
		<Element {...rest} valueKey={finalValueKey} labelKey={finalLabelKey} options={finalOptions} />
	);
}

export default SelectController;
