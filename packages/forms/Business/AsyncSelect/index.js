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
	asyncFieldsPinCodeLocations,
	asyncFieldsHScode,
	asyncCountrySelect,
	asyncAirLinesSelect,
	asyncFieldsCommoditiesList,
	asyncInsuranceCountryList,
	asyncFieldsPartnerQuotation,
	asyncFieldsSixDigitHsCode,
	asyncFieldsOceanPocDetails,
	asyncProductList,
	asyncOrganizationBranches,
	asyncInsuranceCommodities,
	asyncAirLines,
	asyncShippingLines,
	asyncTaxNumbers,
	asyncOrganizationUsers,
	asyncTradeContacts,
	asyncFieldsAirPocDetails,
	asyncFieldsAirLineList,
	asyncFieldsShippingLineList,
} from '../../utils/getAsyncFields';

const keyAsyncFieldsParamsMapping = {
	locations                  : asyncFieldsLocations,
	locations2                 : asyncFieldsLocations2,
	partners                   : asyncFieldsPartner,
	partner_roles              : asyncFieldsPartnerRoles,
	hs_code_countries          : asyncFieldsHsCodeCountries,
	list_partner_quotation     : asyncFieldsPartnerQuotation,
	list_products              : asyncProductList,
	country_list_with_flag     : asyncCountrySelect,
	pin_code                   : asyncFieldsPinCodeLocations,
	shipping_lines             : asyncShippingLines,
	hs_code                    : asyncFieldsHScode,
	air_lines                  : asyncAirLinesSelect,
	commodities_list_insurance : asyncFieldsCommoditiesList,
	insurance_country_list     : asyncInsuranceCountryList,
	'organization-branches'    : asyncOrganizationBranches,
	insurance_commodities      : asyncInsuranceCommodities,
	'air-lines'                : asyncAirLines,
	'shipping-lines'           : asyncShippingLines,
	tax_numbers                : asyncTaxNumbers,
	organization_users         : asyncOrganizationUsers,
	trade_contacts             : asyncTradeContacts,
	six_digit_hs_code          : asyncFieldsSixDigitHsCode,
	list_ocean_poc_details     : asyncFieldsOceanPocDetails,
	list_air_poc_details       : asyncFieldsAirPocDetails,
	airline_list               : asyncFieldsAirLineList,
	shippingline_list          : asyncFieldsShippingLineList,
};

function AsyncSelect(props) {
	const {
		params = {},
		multiple,
		asyncKey,
		initialCall,
		getModifiedOptions,
		getSelectedOption = () => { },
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
			(option) => option?.id === selectedValue,
		);
		getSelectedOption(selectedOption[0]);
	}
	const Element = multiple ? MultiSelect : Select;
	return (
		<Element
			{...rest}
			{...getAsyncOptionsProps}
		// key={getAsyncOptionsProps?.id}
		/>
	);
}

export default AsyncSelect;
