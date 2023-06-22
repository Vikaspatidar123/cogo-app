function asyncFieldsLocations2() {
	return {
		valueKey    : 'id',
		labelKey    : 'name',
		endpoint    : 'list_locations',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 50,
			sort_by    : 'name',
			sort_type  : 'asc',
			includes   : { country: true, main_ports: true, default_params_required: true },

		},
	};
}
function asyncFieldsShippingLines() {
	return {
		valueKey       : 'id',
		labelKey       : 'short_name',
		endpoint       : 'list_operators',
		authKey        : 'list_operators',
		defaultOptions : true,
		defaultParams  : {
			filters    : { operator_type: 'shipping_line', status: 'active' },
			page_limit : 100,
			sort_by    : 'short_name',
			sort_type  : 'asc',
		},
	};
}
function asyncFieldsLocations(labelKey = 'name', valueKey = 'id') {
	return {
		valueKey,
		labelKey,
		endpoint    : 'list_locations',
		// authKey     : 'get_list_locations',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 50,
			sort_by    : 'name',
			sort_type  : 'asc',
			includes   : { country: true, main_ports: true, default_params_required: true },
		},
	};
}

function asyncFieldsPartner() {
	return {
		labelKey    : 'business_name',
		valueKey    : 'id',
		endpoint    : 'list_partners',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
	};
}

function asyncFieldsPartnerRoles() {
	return {
		labelKey    : 'name',
		valueKey    : 'id',
		endpoint    : 'list_auth_roles',
		initialCall : true,
		authKey     : 'get_list_auth_roles',
		params      : {
			filters    : { status: 'active' },
			page_limit : 100,
		},
	};
}

function asyncFieldsHsCodeCountries() {
	return {
		labelKey      : 'countryName',
		valueKey      : 'id',
		endpoint      : '/saas/hs-code/countries',
		authKey       : 'get_saas_hs_code_countries',
		initialCall   : true,
		defaultParams : { page_limit: 20 },
	};
}

function asyncFieldsPinCodeLocations(labelKey = 'name', valueKey = 'id') {
	return {
		valueKey,
		labelKey,
		endpoint    : 'list_locations',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 20,
			includes   : { country: true, default_params_required: true },
		},
	};
}

function asyncAirLines() {
	return {
		valueKey      : 'id',
		labelKey      : 'short_name',
		endpoint      : 'list_operators',
		initialCall   : true,
		defaultParams : {
			filters    : { operator_type: 'airline', status: 'active' },
			page_limit : 100,
			sort_by    : 'short_name',
			sort_type  : 'asc',
		},
	};
}
function asyncShippingLines() {
	return {
		valueKey    : 'id',
		labelKey    : 'short_name',
		endpoint    : 'list_operators',
		initialCall : true,
		params      : {
			filters    : { operator_type: 'shipping_line', status: 'active' },
			page_limit : 100,
			sort_by    : 'short_name',
			sort_type  : 'asc',
		},
	};
}
function asyncFieldsHScode() {
	return {
		valueKey    : 'id',
		labelKey    : 'name',
		endpoint    : 'list_hs_codes',
		initialCall : true,
		params      : { page_limit: 20 },
	};
}
function asyncCountrySelect() {
	return {
		valueKey : 'id',
		labelKey : 'display_name',
		endpoint : 'list_locations',
		params   : {
			filters  : { type: 'country' },
			includes : {
				default_params_required : true,
				flag_icon_url           : true, // country_code: true,
			},
			page_limit : 20,
			sort_by    : 'name',
			sort_type  : 'asc',
		},
	};
}
function asyncAirLinesSelect() {
	return {
		valueKey    : 'id',
		labelKey    : 'short_name',
		endpoint    : 'list_operators',
		initialCall : true,
		params      : {
			filters    : { operator_type: 'airline', status: 'active' },
			page_limit : 100,
			sort_by    : 'short_name',
			sort_type  : 'asc',
		},
	};
}
function asyncFieldsCommoditiesList() {
	return {
		labelKey      : 'label',
		valueKey      : 'id',
		endpoint      : 'saas/insurance/list-commodities',
		authKey       : 'get_saas_insurance_list_commodities',
		initialCall   : true,
		defaultParams : {},
	};
}

function asyncInsuranceCountryList() {
	return {
		labelKey      : 'label',
		valueKey      : 'locationId',
		endpoint      : 'saas/insurance/list/countries',
		authKey       : 'get_saas_insurance_list_countries',
		initialCall   : true,
		defaultParams : {},
	};
}

function asyncFieldsPartnerQuotation() {
	return {
		labelKey    : 'displayName',
		valueKey    : 'id',
		endpoint    : 'saas/organization/partner/list',
		authKey     : 'get_saas_organization_partner_list',
		initialCall : false,

	};
}

function asyncInsuranceCommodities() {
	return {
		valueKey       : 'id',
		labelKey       : 'commodity',
		authKey        : 'get_saas_insurance_list_commodities',
		endpoint       : '/saas/insurance/list-commodities',
		defaultParams  : {},
		defaultOptions : true,
		isSearchable   : true,
		initialCall    : false,

	};
}

function asyncTradeParties() {
	return {
		valueKey       : 'organization_id',
		labelKey       : 'display_name',
		endpoint       : 'list_organization_trade_parties',
		defaultOptions : true,
		defaultParams  : {
			filters    : { status: 'active' },
			page_limit : 10,
		},

	};
}
function asyncOrganizationUsers() {
	return {
		valueKey       : 'name',
		labelKey       : 'name',
		endpoint       : 'list_organization_users',
		defaultParams  : {},
		defaultOptions : true,
		isSearchable   : true,
	};
}
function asyncHsCodes() {
	return {
		valueKey       : 'id',
		labelKey       : 'label',
		endpoint       : 'list_hs_codes',
		defaultParams  : { page_limit: 20 },
		defaultOptions : true,
	};
}
function asyncHsCodesCountries() {
	return {
		valueKey       : 'id',
		labelKey       : 'countryName',
		authKey        : 'get_saas_hs_code_countries',
		endpoint       : 'saas/hs-code/countries',
		defaultParams  : { page_limit: 20 },
		defaultOptions : true,
	};
}
function asyncOrganizationBranches() {
	return {
		valueKey       : 'id',
		labelKey       : 'branch_name',
		endpoint       : 'list_organization_branches',
		defaultOptions : true,
		defaultParams  : {
			filters    : { status: 'active' },
			page_limit : 10,
		},
	};
}
function asyncProductList() {
	return {
		labelKey    : 'name',
		valueKey    : 'name',
		authKey     : 'get_saas_product_list',
		endpoint    : 'saas/product/list',
		initialCall : false,
	};
}

function asyncFieldsShippingLine() {
	return {
		labelKey    : 'short_name',
		valueKey    : 'id',
		endpoint    : 'list_operators',
		initialCall : true,
		params      : {
			filters    : { operator_type: 'shipping_line', status: 'active' },
			page_limit : 100,
			sort_by    : 'short_name',
			sort_type  : 'asc',
		},
	};
}

function asyncFieldsAirLine() {
	return {
		labelKey    : 'label',
		valueKey    : 'id',
		endpoint    : 'list_operators',
		initialCall : true,
		params      : {
			filters    : { operator_type: 'airline', status: 'active' },
			page_limit : 100,
			sort_by    : 'short_name',
			sort_type  : 'asc',
		},
	};
}
function asyncTaxNumbers() {
	return {
		labelKey    : 'label',
		valueKey    : 'tax_number',
		endpoint    : '/get_tax_numbers_data',
		initialCall : true,
	};
}

function asyncTradeContacts() {
	return {
		valueKey       : 'id',
		labelKey       : 'company_name',
		endpoint       : 'list_trade_contacts',
		defaultParams  : { page_limit: 20 },
		defaultOptions : true,
	};
}

export {
	asyncFieldsLocations,
	asyncFieldsLocations2,
	asyncFieldsPartner,
	asyncFieldsPartnerRoles,
	asyncFieldsHsCodeCountries,
	asyncFieldsCommoditiesList,
	asyncInsuranceCountryList,
	asyncFieldsPartnerQuotation,
	asyncProductList,
	asyncFieldsShippingLine,
	asyncFieldsAirLine,
	asyncFieldsPinCodeLocations,
	asyncFieldsHScode,
	asyncCountrySelect,
	asyncAirLinesSelect,
	asyncAirLines,
	asyncShippingLines,
	asyncInsuranceCommodities,
	asyncTradeParties,
	asyncOrganizationUsers,
	asyncHsCodes,
	asyncHsCodesCountries,
	asyncOrganizationBranches,
	asyncTaxNumbers,
	asyncTradeContacts,
	asyncFieldsShippingLines,
};
