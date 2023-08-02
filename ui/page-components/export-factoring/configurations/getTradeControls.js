import { Image } from '@/packages/next';

export const tradeControls = (setSelectedCountry) => [

	{
		name          : 'payment_terms',
		type          : 'select',
		label         : 'Payment Terms',
		multiple      : true,
		autoCloseMenu : false,
		placeholder   : 'Select Payment Terms',
		options       : [
			{
				label : 'Cash Against Documents',
				value : 'Cash Against Documents',
			},
			{
				label : 'Document Against Payment',
				value : 'Document Against Payment',
			},
			{
				label : 'Document Against Acceptance',
				value : 'Document Against Acceptance',
			},
			{
				label : 'Letter of Credit',
				value : 'Letter of Credit',
			},
			{
				label : 'Open Account',
				value : 'Open Account',
			},
			{
				label : 'Advance Payment',
				value : 'Advance Payment',
			},
		],
		rules: { required: 'Payment Terms is required' },
	},
	{
		name        : 'countries_exported',
		heading     : 'Trade Details',
		type        : 'fieldArray',
		showButtons : true,
		buttonText  : 'Add More',
		value       : [
			{
				country           : '',
				products_exported : '',
			},
		],
		noDeleteButtonTill : 1,
		controls           : [
			{
				name           : 'country',
				label          : 'Country *',
				type           : 'async_select',
				placeholder    : 'Enter Country',
				asyncKey       : 'locations',
				defaultOptions : true,
				labelKey       : 'label',
				initialCall    : true,
				params         : {
					filters: {
						type: 'country',
					},
				},
				handleChange       : (e) => { setSelectedCountry((prev) => ({ ...prev, [e?.id]: e })); },
				getModifiedOptions : (options = []) => (options || []).map((x) => ({
					...x,
					value : x.id,
					label : (
						<div style={{ display: 'flex' }}>
							<img src={x.flag_icon_url} alt="" />
							<div style={{ marginLeft: '5px' }}>{x.name}</div>
						</div>
					),
				})),
			},
			{
				name        : 'products_exported',
				label       : 'Products Exported',
				type        : 'creatable_multi_select',
				placeholder : 'Enter Products...',
				multiple    : true,
				rules       : {
					required: true,
				},
			},
		],
	},
];
