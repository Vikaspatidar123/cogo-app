import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';
import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();
const REGISTRATION_LABEL = getCountrySpecificData({
	country_id    : geo.country.id,
	accessorType  : 'registration_number',
	accessor      : 'label',
	isDefaultData : true,

});

export const EDIT_COMPANY_CONTROLS = [
	{
		name     : 'name',
		label    : 'Name',
		type     : 'text',
		disabled : true,
	},
	{
		name     : 'pan',
		label    : 'PAN',
		type     : 'text',
		disabled : true,
	},
	{
		name     : 'gst_number',
		label    : `${REGISTRATION_LABEL} Number`,
		type     : 'text',
		disabled : true,
	},
	{
		name     : 'date',
		label    : 'Date of Incorporation',
		type     : 'text',
		disabled : true,
	},
	{
		name  : 'company_address',
		label : 'Address',
		type  : 'text',
	},
	{
		name  : 'city',
		label : 'City',
		type  : 'text',
	},
	{
		name  : 'state',
		label : 'State',
		type  : 'text',
	},
	{
		name  : 'country',
		label : 'Country',
		type  : 'text',
	},
	{
		name  : 'pincode',
		label : 'Pincode',
		type  : 'text',
	},
	{
		type     : 'text',
		name     : 'constitution_of_business',
		label    : 'Constitution of Business',
		disabled : true,
	},
];
