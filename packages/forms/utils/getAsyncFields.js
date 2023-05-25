function asyncFieldsLocations2() {
	return {
		valueKey    : 'id',
		labelKey    : 'name',
		endpoint    : 'list_locations',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 20,
			includes   : { country: null, main_ports: null },
		},
	};
}

function asyncFieldsLocations(labelKey = 'name', valueKey = 'id') {
	return {
		valueKey,
		labelKey,
		endpoint    : 'list_locations',
		authKey     : 'get_list_locations',
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 20,
			sort_by    : 'name',
			sort_type  : 'asc',
			includes   : { country: null, main_ports: null },
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
function asyncCountrySelect() {
	return {
		valueKey : 'id',
		labelKey : 'display_name',
		endpoint : 'list_locations',
		params   : {
			filters: { type: 'country' },

			includes: {
				default_params_required: true, // flag_icon_url: true, // country_code: true,
			},

			page_limit: 20,

			sort_by: 'name',

			sort_type: 'asc',
		},
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

export {
	asyncFieldsLocations,
	asyncFieldsLocations2,
	asyncFieldsPartner,
	asyncFieldsPartnerRoles,
	asyncFieldsHsCodeCountries,
	asyncAirLines,
	asyncShippingLines,
	asyncCountrySelect,
	asyncFieldsPartnerQuotation,
	asyncInsuranceCommodities,
};
