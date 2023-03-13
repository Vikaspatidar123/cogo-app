function asyncFieldsLocations2() {
	return {
		valueKey    : 'id',
		labelKey    : 'name',
		endpoint    : 'list_locations_v2',
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
		initialCall : true,
		params      : {
			filters    : { status: 'active' },
			page_limit : 10,
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
		endpoint      : 'saas/hs-code/countries',
		initialCall   : true,
		defaultParams : { page_limit: 20 },
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
		valueKey      : 'id',
		endpoint      : 'saas/insurance/list/countries',
		authKey       : 'get_saas_insurance_list_commodities',
		initialCall   : true,
		defaultParams : {},
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
};
