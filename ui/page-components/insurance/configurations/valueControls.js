import { IcMCloudUpload } from '@cogoport/icons-react';

const get = (formObject, key) => formObject[key];

// const invoiceNumberValidator = /^[A-Za-z]+-\d+$/g;

const controls = [
	{
		name        : 'policyCurrency',
		type        : 'select',
		placeholder : 'Currency',
		options     : [
			{
				label : 'INR',
				value : 'INR',
			},
			{
				label : 'USD',
				value : 'USD',
			},
		],
		span: 4,
	},
	{
		name        : 'cargoAmount',
		placeholder : 'Consignment Value',
		type        : 'number',
		span        : 6,
		rules       : {
			maxValue: {
				value   : 400000000,
				message : 'Maximum Invoice Value is INR 400000000 only for Bajaj',
			},
		},
	},
	{
		name        : 'invoiceNo',
		placeholder : 'Invoice No.',
		type        : 'text',
		span        : 6,
		rules       : {
			// pattern: {
			// 	// value: invoiceNumberValidator,
			// 	message: 'No special characters are allowed',
			// },
		},
	},
	{
		name        : 'invoiceDate',
		placeholder : 'Invoice Date',
		maxDate     : new Date(),
		type        : 'datepicker',
		span        : 6,
	},
	{
		name        : 'invoiceDoc',
		placeholder : 'Invoice Proof',
		type        : 'file',
		accept      : '.pdf, .png, .jpg, .jpeg,',
		format      : '(only pdf, png, jpg, jpeg, formats)',
		iconSvg     : <IcMCloudUpload fill="#CFEAED" width={40} height={40} />,
		drag        : true,
		uploadType  : 'aws',
		span        : 4,
	},
	{
		name        : 'panDoc',
		placeholder : 'PAN Proof',
		type        : 'file',
		accept      : '.pdf, .png, .jpg, .jpeg,',
		format      : '(only pdf, png, jpg, jpeg, formats)',
		iconSvg     : <IcMCloudUpload fill="#CFEAED" width={40} height={40} />,
		drag        : true,
		uploadType  : 'aws',
		span        : 4,
	},
	{
		name        : 'gstDoc',
		placeholder : 'Tax Number Proof',
		type        : 'file',
		accept      : '.pdf, .png, .jpg, .jpeg,',
		format      : '(only pdf, png, jpg, jpeg, formats)',
		iconSvg     : <IcMCloudUpload fill="#CFEAED" width={40} height={40} />,
		drag        : true,
		uploadType  : 'aws',
		span        : 4,
	},
	{
		name        : 'aadharDoc',
		placeholder : 'Aadhar Proof',
		type        : 'file',
		accept      : '.pdf, .png, .jpg, .jpeg,',
		format      : '(only pdf, png, jpg, jpeg, formats)',
		iconSvg     : <IcMCloudUpload fill="#CFEAED" width={40} height={40} />,
		drag        : true,
		uploadType  : 'aws',
		span        : 4,
	},
];

const getControls = ({ formDetails, uploadType }) => {
	const modifiedControls = controls.filter((item) => (uploadType === 'CORPORATE'
		? item.name !== 'aadharDoc' : item.name !== 'gstDoc'));
	return modifiedControls.map((control) => {
		if (['panDoc', 'gstDoc', 'aadharDoc', 'invoiceDoc'].includes(control.name)) {
			return {
				...control,
				value: get(formDetails?.verificationDoc, control.name) || '',
			};
		}
		return {
			...control,
			value: get(formDetails, control.name) || '',
		};
	});
};

export default getControls;
