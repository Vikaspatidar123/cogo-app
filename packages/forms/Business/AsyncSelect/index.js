import { MultiSelect, Select } from '@cogoport/components';
import { isEmpty, merge } from '@cogoport/utils';

import useGetAsyncOptions from '../../hooks/useGetAsyncOptions';
import useGetAsyncOptionsBf from '../../hooks/useGetAsyncOptionsBf';
import {
	asyncFieldsLocations,
	asyncFieldsLocations2,
	asyncFieldsPartner,
	asyncFieldsPartnerRoles,
	asyncFieldsHsCodeCountries,
	asyncFieldsPartnerQuotation,
	// asyncProductList,
	asyncCountrySelect,
	asyncOrganizationBranches,
} from '../../utils/getAsyncFields';

/**
 * to get async options, first check desired endpoint is present or not,
 * 1. if present
 * 		1. get the endpoint function "key" from "keyAsyncFieldsParamsMapping" obj
 * 		2. pass that function "key" as value in "asyncKey" property in control
 * 2. if not present
 * 		1. add function in "common/utils/getAsyncFields" file and export it,
 * 		2. import that function from "utils/getAsyncFields",
 * 		3. add a new "key" in "keyAsyncFieldsParamsMapping" obj with value as
 * 			function reference, note. do not call the function
 * 		4. then follow 1.1 and 1.2 steps
 *
 * if you want to modify the options, pass "getModifiedOptions" function in control,
 * @method
 * @param {Object} Object: { options: [] => Async Options }
 * @returns {Array} Modified Async Options
 * getModifiedOptions
 */
const keyAsyncFieldsParamsMapping = {
	locations               : asyncFieldsLocations,
	locations2              : asyncFieldsLocations2,
	partners                : asyncFieldsPartner,
	partner_roles           : asyncFieldsPartnerRoles,
	hs_code_countries       : asyncFieldsHsCodeCountries,
	list_partner_quotation  : asyncFieldsPartnerQuotation,
	// list_products          : asyncProductList,
	country_list_with_flag  : asyncCountrySelect,
	'organization-branches' : asyncOrganizationBranches,
};

function AsyncSelect(props) {
	const {
		params = {},
		multiple,
		asyncKey,
		initialCall,
		getModifiedOptions,
		getSelectedOption = () => {},
		...rest
	} = props;
	const defaultParams = keyAsyncFieldsParamsMapping[asyncKey]?.() || {};

	const callFunction = defaultParams.authKey
		? useGetAsyncOptionsBf
		: useGetAsyncOptions;

	const getAsyncOptionsProps = callFunction({
		...defaultParams,
		initialCall,
		params   : merge(params, defaultParams.params),
		labelKey : rest.labelKey || defaultParams.labelKey,
		valueKey : rest.valueKey || defaultParams.valueKey,
		getModifiedOptions,
	});

	if (typeof getSelectedOption === 'function' && !isEmpty(rest.value)) {
		let selectedValue;
		if (multiple) {
			selectedValue = rest.value.slice(-1);
		} else {
			selectedValue = rest.value;
		}

		const selectedOption = getAsyncOptionsProps.options.filter(
			(option) => option.id === selectedValue,
		);
		getSelectedOption(selectedOption[0]);
	}

	const Element = multiple ? MultiSelect : Select;

	return (
		<Element
			{...rest}
			{...getAsyncOptionsProps}
		/>
	);
}

export default AsyncSelect;
