import { Pill } from '@cogoport/components';
import { IcMCloudUpload } from '@cogoport/icons-react';

import getGeoConstants from '@/ui/commons/constants/geo';

const getModifiedOptionsForGST = (options) => (options || []).map((x) => ({
	...x,
	value: x?.tax_number,
	label:
	<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={x?.tax_number}>
		<div>{x?.tax_number}</div>
		<div>
			{x?.tax_number_document_url ? <Pill color="green">Proof exists</Pill> : ''}
		</div>
	</div>,
}));

export const COMPANY_DETAILS_CONTROLS = [
	{
		label       : 'PAN',
		name        : 'pan',
		type        : 'text',
		placeholder : 'PAN',
		showField   : true,
		disabled    : true,
		rules       : { required: true },
	},
	{
		name               : 'tax_number',
		type               : 'async_select',
		asyncKey           : 'tax_numbers',
		getModifiedOptions : getModifiedOptionsForGST,
		showField          : true,
		valueKey           : 'tax_number',
		labelKey           : 'label',
		initialCall        : true,
		rules              : { required: true },
	},
	{
		name        : 'gst_proof',
		type        : 'text',
		placeholder : 'Only Image, pdf/doc...',
		prefix      : <IcMCloudUpload width={18} height={18} />,
		suffix      : <div style={{ margin: '0 8px' }}>Upload</div>,
		readonly    : true,
		showField   : true,
		rules       : { required: true },
	},
];

export const getCompanyControls = ({
	setSelectedGstDetails = () => { },
	profile = {},
	setShow = () => { },
	hasRequestedForCredit = false,
}) => {
	const geo = getGeoConstants();
	const REGISTRATION_LABEL = geo.others.registration_number.label;
	const suffix = (
		<div
			onClick={() => setShow(true)}
			role="presentation"
			style={{ margin: '0 8px', cursor: 'pointer' }}
		>
			Upload

		</div>
	);
	return COMPANY_DETAILS_CONTROLS.map((control) => {
		if (control.name === 'tax_number') {
			return ({
				...control,
				label       : REGISTRATION_LABEL,
				placeholder : REGISTRATION_LABEL,
				params      : {
					organization_id     : profile?.organization?.id,
					registration_number : profile?.organization?.registration_number,
				},
				handleChange : (e) => setSelectedGstDetails(e),
				disabled     : hasRequestedForCredit,
			});
		}
		if (control.name === 'gst_proof') {
			return {
				...control,
				label    : `Upload ${REGISTRATION_LABEL} Proof`,
				suffix,
				disabled : hasRequestedForCredit,
			};
		}
		return control;
	});
};
