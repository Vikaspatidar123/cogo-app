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
	asyncFieldsCommoditiesList,
	asyncInsuranceCountryList,
	asyncFieldsPartnerQuotation,
	asyncProductList,
	asyncCountrySelect,
	asyncOrganizationBranches,
	asyncInsuranceCommodities,
	asyncAirLines,
	asyncShippingLines,
} from '../../utils/getAsyncFields';

const keyAsyncFieldsParamsMapping = {
	locations                  : asyncFieldsLocations,
	locations2                 : asyncFieldsLocations2,
	partners                   : asyncFieldsPartner,
	partner_roles              : asyncFieldsPartnerRoles,
	hs_code_countries          : asyncFieldsHsCodeCountries,
	commodities_list_insurance : asyncFieldsCommoditiesList,
	insurance_country_list     : asyncInsuranceCountryList,
	list_partner_quotation     : asyncFieldsPartnerQuotation,
	list_products              : asyncProductList,
	country_list_with_flag     : asyncCountrySelect,
	'organization-branches'    : asyncOrganizationBranches,
	insurance_commodities      : asyncInsuranceCommodities,
	'air-lines'                : asyncAirLines,
	'shipping-lines'           : asyncShippingLines,
};

function AsyncSelect(props) {
	console.log('🚀 ~ file: index.js:41 ~ AsyncSelect ~ props:', props);
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
		value    : rest.value,
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
