import { Pill } from '@cogoport/components';
import { IcMCloudUpload } from '@cogoport/icons-react';

import { getLocaleSpecificLabels } from '@/ui/commons/constants/CountrySpecificDetail';

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

export const getCompanyDetailsControls = () => {
	const IDENTIFICAITON_LABEL = getLocaleSpecificLabels({
		accessorType : 'identification_number',
		accessor     : 'label',
	});

	return [
		{
			name        : 'pan',
			label       : IDENTIFICAITON_LABEL,
			placeholder : IDENTIFICAITON_LABEL,
			type        : 'text',
			showField   : true,
			disabled    : true,
			rules       : { required: true },
		},
		{
			label       : 'IEC',
			name        : 'iec',
			type        : 'text',
			placeholder : 'IEC',
			showField   : true,
			rules       : { required: true },
		},
		{
			label              : 'GST',
			name               : 'tax_number',
			type               : 'async_select',
			placeholder        : 'GST',
			asyncKey           : 'tax_numbers',
			getModifiedOptions : getModifiedOptionsForGST,
			showField          : true,
			valueKey           : 'tax_number',
			labelKey           : 'label',
			initialCall        : true,
			rules              : { required: true },
		},
		{
			label       : 'Upload GST Proof',
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
};

export const getCompanyControls = ({
	setSelectedGstDetails = () => { },
	profile = {},
	setShow = () => { },
	hasRequestedForCredit = false,
	setProofUrl = () => {},
}) => getCompanyDetailsControls().map((control) => {
	if (control.name === 'tax_number') {
		return ({
			...control,
			params: {
				organization_id     : profile?.organization?.id,
				registration_number : profile?.organization?.registration_number,

			},
			type         : hasRequestedForCredit ? 'hidden' : control.type,
			handleChange : (e) => { setSelectedGstDetails(e); setProofUrl(e?.tax_number_document_url); },
			disabled     : hasRequestedForCredit,
		});
	}
	if (control.name === 'gst_proof') {
		return {
			...control,
			style    : hasRequestedForCredit ? { display: 'none' } : {},
			suffix   : <div style={{ margin: '0 8px' }} onClick={() => setShow(true)} role="presentation">Upload</div>,
			disabled : hasRequestedForCredit,
		};
	}

	return control;
});
