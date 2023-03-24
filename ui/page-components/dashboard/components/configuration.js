const controls = [
	{
		name        : 'name',
		type        : 'text',
		placeholder : 'PAN',
		label       : 'Registration No. (PAN for India)',
	},
	{
		name        : 'upload',
		type        : 'file',
		placeholder : 'Upload here...',
		label       : 'Company\'s Address Proof',
	},
	{
		name        : 'upload',
		type        : 'mobile_number',
		placeholder : 'Upload here...',
		label       : 'Mobile Number',
	},
];
const getControls = () => controls.map((control) => control);

export default getControls;
