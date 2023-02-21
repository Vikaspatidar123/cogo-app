const getConfig = ({ t = () => {} }) => ({
	billingAddress: {
		apiEndpoint : 'list_organization_billing_addresses',
		list        : [
			{
				key   : 'address',
				label : 'Address',
				span  : 4,
			},
			{
				key   : 'pincode',
				label : 'Pincode',
				span  : 2,
			},
			{
				key   : 'tax',
				label : 'GST/TAX',
				span  : 2,
			},
			{
				key   : 'taxProof',
				label : 'TAX Proof',
				span  : 2,
			},
			{
				key   : 'isSez',
				label : 'Is SEZ?',
				span  : 2,
			},
		],
	},
	otherAddress: {
		apiEndpoint : 'list_organization_addresses',
		list        : [
			{
				key   : 'address',
				label : 'Address',
				span  : 3,
			},
			{
				key   : 'pincode',
				label : 'Pincode',
				span  : 3,
			},
			{
				key   : 'addressType',
				label : 'Address Type',
				span  : 3,
			},
			{
				key   : 'country',
				label : 'Country',
				span  : 3,
			},
		],
	},
});

export default getConfig;
