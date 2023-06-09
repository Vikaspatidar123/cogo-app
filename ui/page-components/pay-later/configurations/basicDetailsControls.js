import { Pill } from '@cogoport/components';
import { IcMCloudUpload } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

const getUserWork = (workscope) => {
	if (workscope.includes('in')) { return startCase(workscope.split('_in_')?.[1]?.replaceAll('_', ' ')); }
	return startCase(workscope.split('_am_')?.[1]?.replaceAll('_', ' '));
};

const getModifiedOptionsForOrgUsers = (options) => (options || []).map((x) => ({
	...x,
	value: x.id,
	label:
	<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
		<div>
			{x.name}
			-
			{x.work_scopes.map((work) => `${getUserWork(work)}/`)}
		</div>
	</div>,
}));

export const basicDetailsControls = [
	{
		label       : 'PAN',
		name        : 'pan',
		type        : 'text',
		placeholder : 'PAN',
		section     : 'company_details',
		showField   : true,
	},
	{
		label              : 'GST',
		name               : 'gst',
		type               : 'async_select',
		placeholder        : 'GST',
		section            : 'company_details',
		asyncKey           : 'tax_numbers',
		getModifiedOptions : (options) => (options || []).map((x) => ({
			...x,
			value: x.tax_number,
			label:
	<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
		<div>{x.tax_number}</div>
		<div>
			{x.tax_number_document_url ? <Pill color="green">Proof exists</Pill> : ''}
		</div>
	</div>,
		})),
		showField: true,
	},
	{
		label       : 'Upload GST Proof',
		name        : 'gst_proof',
		type        : 'text',
		placeholder : 'Only Image, pdf/doc...',
		section     : 'company_details',
		prefix      : <IcMCloudUpload width={18} height={18} />,
		suffix      : <div style={{ margin: '0 8px' }}>Upload</div>,
		readonly    : true,
		showField   : true,
	},
	{
		label              : '',
		name               : 'owner',
		type               : 'async_select',
		placeholder        : 'Owner',
		section            : 'poc',
		isAccordian        : true,
		showField          : true,
		asyncKey           : 'organization_users',
		labelKey           : 'label',
		valueKey           : 'id',
		getModifiedOptions : getModifiedOptionsForOrgUsers,
	},
	{
		label              : '',
		name               : 'finance_head',
		type               : 'async_select',
		placeholder        : 'Finance Head',
		section            : 'poc',
		isAccordian        : true,
		showField          : true,
		asyncKey           : 'organization_users',
		labelKey           : 'label',
		valueKey           : 'id',
		getModifiedOptions : getModifiedOptionsForOrgUsers,
	},
	{
		label              : '',
		name               : 'logistics_head',
		type               : 'async_select',
		placeholder        : 'Logistics Head',
		section            : 'poc',
		isAccordian        : true,
		showField          : true,
		asyncKey           : 'organization_users',
		labelKey           : 'label',
		valueKey           : 'id',
		getModifiedOptions : getModifiedOptionsForOrgUsers,
	},
	{
		label       : 'Payment Days',
		name        : 'payment_days',
		type        : 'text',
		placeholder : 'Type here...',
		section     : 'requirements',
		showField   : true,
	},
	{
		label       : 'Payment Requirements',
		name        : 'payment_requirement',
		type        : 'text',
		placeholder : 'Type here...',
		section     : 'requirements',
		showField   : true,
	},
];

export const getControls = ({
	profile = {},
	setGSTDetails = () => {},
	gstDetails = {},
	setShow = () => {},
	setPOCDetails = () => {},
}) => basicDetailsControls.map((control) => {
	if (control.name === 'gst') {
		return ({
			...control,
			params: {
				organization_id     : profile?.organization?.id,
				registration_number : profile?.organization?.registration_number,
			},
			handleChange: (e) => setGSTDetails(e),
		});
	}
	if (control.name === 'gst_proof') {
		return {
			...control,
			showField : !gstDetails.tax_number_document_url,
			prefix    : <IcMCloudUpload width={18} height={18} />,
			suffix:
	<div
		style={{ margin: '0 8px' }}
		onClick={() => setShow(true)}
		role="presentation"
	>
		Upload
	</div>,
		};
	}
	if (['owner', 'finance_head', 'logistics_head'].includes(control.name)) {
		return {
			...control,
			handleChange: (e) => setPOCDetails((prev) => ({
				...prev,
				[control.name]: e,
			})),
		};
	}
	return control;
});
