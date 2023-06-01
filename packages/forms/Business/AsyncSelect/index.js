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

	if (
		typeof getModifiedOptions === 'function'
        && !isEmpty(getAsyncOptionsProps.options)
	) {
		getAsyncOptionsProps.options = getModifiedOptions(
			getAsyncOptionsProps.options,
		);
	}

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
	const { onHydrateValue, ...optionRest } = getAsyncOptionsProps || [];

	return (
		<Element
			{...rest}
			{...optionRest}
		/>
	);
}

export default AsyncSelect;
