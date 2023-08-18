import { getLocaleSpecificLabels } from '@/ui/commons/constants/CountrySpecificDetail';
import getGeoConstants from '@/ui/commons/constants/geo';

export const getEditCompanyControls = () => {
	const geo = getGeoConstants();
	const REGISTRATION_LABEL = geo.others.registration_number.label;

	const IDENTIFICAITON_LABEL = getLocaleSpecificLabels({
		accessorType : 'identification_number',
		accessor     : 'label',
	});

	return (
		[
			{
				name     : 'name',
				label    : 'Name',
				type     : 'text',
				disabled : true,
			},
			{
				name     : 'pan',
				label    : IDENTIFICAITON_LABEL,
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
		]
	);
};
