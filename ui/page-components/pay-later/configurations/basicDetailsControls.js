import { IcMCloudUpload } from '@cogoport/icons-react';

export const basicDetailsControls = [
	{
		name        : 'PAN',
		key         : 'pan',
		type        : 'text',
		placeholder : 'PAN',
		section     : 'company_details',
	},
	{
		name        : 'GST',
		key         : 'gst',
		type        : 'async_select',
		placeholder : 'GST',
		section     : 'company_details',
		asyncKey    : 'tax_numbers',
	},
	{
		name        : 'Upload GST Proof',
		key         : 'gst_proof',
		type        : 'text',
		placeholder : 'Only Image, pdf/doc...',
		section     : 'company_details',
		prefix      : <IcMCloudUpload width={18} height={18} />,
		suffix      : <div style={{ margin: '0 8px' }}>Upload</div>,
	},
	{
		name        : '',
		key         : 'owner',
		type        : 'select',
		placeholder : 'Owner',
		section     : 'poc',
		isAccordian : true,
	},
	{
		name        : '',
		key         : 'finance_head',
		type        : 'select',
		placeholder : 'Finance Head',
		section     : 'poc',
		isAccordian : true,
	},
	{
		name        : '',
		key         : 'logistics_head',
		type        : 'select',
		placeholder : 'Logistics Head',
		section     : 'poc',
		isAccordian : true,
	},
	{
		name        : 'Payment Days',
		key         : 'payment_days',
		type        : 'text',
		placeholder : 'Type here...',
		section     : 'requirements',
	},
	{
		name        : 'Payment Requirements',
		key         : 'payment_requirement',
		type        : 'text',
		placeholder : 'Type here...',
		section     : 'requirements',
	},
];

export const getControls = ({ profile = {} }) => basicDetailsControls.map((control) => {
	if (control.key === 'gst') {
		return ({
			...control,
			params: {
				organization_id     : profile?.organization?.id,
				registration_number : profile?.organization?.registration_number,
			},
		});
	}
	return control;
});
