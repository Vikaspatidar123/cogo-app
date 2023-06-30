import { getCountrySpecificData, CountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';
import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();
const REGISTRATION_LABEL = getCountrySpecificData({
	country_id    : geo.country.id,
	accessorType  : 'registration_number',
	accessor      : 'label',
	isDefaultData : true,
});

const getAddressMappingControls = ({ organizationCountryId }) => [
	{
		name      : 'gst_list',
		type      : 'select',
		span      : 5.8,
		className : 'primary md',
		showIn    : ['billingAddress'],
		rules     : {
			required: true,
		},
	},
	{
		type  : 'text',
		name  : 'name',
		label : 'Billing Party Name',
		rules : {
			required: 'Billing Party Required',
		},
		span   : 5.8,
		showIn : ['billingAddress', 'otherAddress'],
	},
	{
		type    : 'select',
		name    : 'address_type',
		label   : 'Address Type',
		options : [
			{
				label : 'Office',
				value : 'office',
			},
			{
				label : 'Factory',
				value : 'factory',
			},
			{
				label : 'Warehouse Address',
				value : 'warehouse',
			},
		],
		rules: {
			required: 'Address Required',
		},
		span   : 5.8,
		showIn : ['otherAddress'],
	},
	{
		type     : 'async_select',
		name     : 'country_id',
		label    : 'Country of Registration',
		asyncKey : 'locations',
		params   : {
			filters: {
				type: ['country'],
			},
		},
		defaultOptions : true,
		rules          : {
			required: 'Country Required',
		},
		span   : 5.8,
		showIn : ['otherAddress'],
	},
	{
		type      : 'text',
		name      : 'tax_number',
		label     : `${REGISTRATION_LABEL} Number`,
		className : 'uppercase',
		maxLength : 15,
		rules     : {
			required: `${REGISTRATION_LABEL} Number Required`,
		},
		span   : 5.8,
		showIn : ['billingAddress'],
	},
	{
		type     : 'async_select',
		name     : 'pincode',
		label    : 'Pincode',
		asyncKey : 'locations',
		labelKey : 'postal_code',
		valueKey : 'postal_code',
		params   : {
			filters: {
				type: ['pincode'],
			},
		},
		caret : true,
		rules : {
			required: 'Pincode Required',
		},
		span   : 5.8,
		showIn : ['billingAddress', 'otherAddress'],
	},
	{
		type       : 'file',
		name       : 'tax_number_document_url',
		label      : 'TAX Proof',
		uploadType : 'aws',
		drag       : true,
		height     : 45,
		rules      : {
			required: 'TAX Proof Required',
		},
		span   : 5.8,
		showIn : ['billingAddress'],
	},
	{
		name        : 'organization_branch_id',
		label       : 'Organization Branch',
		placeholder : 'Select organization Branch',
		type        : 'async_select',
		value       : '',
		asyncKey    : 'organization-branches',
		caret       : true,
		isClearable : true,
		initialCall : true,
		rules       : {
			required: 'Name is required',
		},
		showIn : ['billingAddress'],
		span   : 5.8,
	},
	{
		type  : 'textarea',
		name  : 'address',
		label : 'Address',
		rules : {
			required: true,
		},
		span   : 5.8,
		height : 45,
		showIn : ['billingAddress', 'otherAddress'],
		style  : {
			resize: 'vertical',
		},
	},
	{
		type  : 'checkbox',
		name  : 'is_sez',
		label : (
			<>
				Is
				{' '}
				<CountrySpecificData
					country_id={organizationCountryId}
					accessorType="economic_zone"
					accessor="label"
				/>
				{' '}
			</>
		),
		options: [
			{
				value : true,
				label : (
					<>
						Is
						{' '}
						<CountrySpecificData
							country_id={organizationCountryId}
							accessorType="economic_zone"
							accessor="label"
						/>
						{' '}
					</>
				),
			},
		],
		multiple : true,
		span     : 12,
		showIn   : ['billingAddress'],
	},
	{
		type  : 'file',
		name  : 'sez_proof',
		label : (
			<>
				<CountrySpecificData
					country_id={organizationCountryId}
					accessorType="economic_zone"
					accessor="label"
				/>
				{' '}
				Proof
			</>
		),
		uploadType : 'aws',
		drag       : true,
		height     : 45,
		rules      : {
			required: 'Sez proof is required',
		},
		span   : 5.8,
		showIn : ['billingAddress'],
	},
];

export default getAddressMappingControls;
