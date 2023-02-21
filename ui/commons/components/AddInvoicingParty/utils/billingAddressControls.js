import { IcMCloudUpload } from '@cogoport/icons-react';

import patterns from '@/ui/commons/configurations/patterns';

const getControls = ({ t = () => {} }) => {
	const translationKey =		'common:components.addInvoicingParty.utils.controls.billingAddressControls';

	return [
		{
			name  : 'billing_party_name',
			label : t(`${translationKey}.billing_party_name.label`),
			type  : 'text',
			style : {
				flexBasis: '50%',
			},
			rules: { required: true },
		},
		{
			name  : 'address_type',
			label : t(`${translationKey}.address_type.label`),
			type  : 'select',
			style : {
				flexBasis: '50%',
			},
			options: [
				{
					label : t(`${translationKey}.address_type.options.1`),
					value : 'office',
				},
				{
					label : t(`${translationKey}.address_type.options.2`),
					value : 'factory',
				},
				{
					label : t(`${translationKey}.address_type.options.3`),
					value : 'warehouse',
				},
			],
			rules: { required: true },
		},
		{
			label          : t(`${translationKey}.country_id.label`),
			name           : 'country_id',
			type           : 'location-select',
			optionsListKey : 'locations',
			params         : { filters: { type: ['country'] } },
			defaultOptions : true,
			style          : {
				flexBasis: '50%',
			},
			rules: {
				required: true,
			},
		},
		{
			name           : 'pincode',
			label          : t(`${translationKey}.pincode.label`),
			labelKey       : 'postal_code',
			valueKey       : 'postal_code',
			type           : 'location-select',
			optionsListKey : 'locations',
			params         : { filters: { type: ['pincode'] } },
			caret          : true,
			style          : {
				flexBasis: '50%',
			},
			rules: { required: true },
		},
		{
			name  : 'tax_number',
			label : t(`${translationKey}.tax_number.label`),
			type  : 'text',
			style : {
				flexBasis: '50%',
			},
			maxLength : 15,
			rules     : {
				required : true,
				pattern  : {
					value   : patterns.GST_NUMBER,
					message : t(`${translationKey}.tax_number.rules.pattern.message`),
				},
			},
		},
		{
			name       : 'tax_number_document_url',
			label      : t(`${translationKey}.tax_number_document_url.label`),
			type       : 'file',
			drag       : true,
			uploadIcon : () => <IcMCloudUpload width={24} height={24} />,
			style      : {
				flexBasis: '50%',
			},
			uploadType : 'aws',
			height     : 45,
			rules      : { required: true },
		},
		{
			name  : 'address',
			label : t(`${translationKey}.address.label`),
			type  : 'textarea',
			style : {
				flexBasis: '50%',
			},
			rules: { required: true },
		},
		{
			name    : 'is_sez',
			type    : 'checkbox',
			span    : 12,
			options : [
				{
					value : 'addressIsSez',
					label : t(`${translationKey}.is_sez.options.1`),
				},
			],
			multiple: true,
		},
		{
			name  : 'sez_proof',
			label : t(`${translationKey}.sez_proof.label`),
			type  : 'file',
			drag  : true,
			style : {
				flexBasis: '100%',
			},
			uploadType : 'aws',
			height     : 45,
			uploadIcon : () => <IcMCloudUpload width={24} height={24} />,
			rules      : { required: true },
		},
	];
};

const getBillingAddressControls = ({ values = {}, t = () => {} }) => {
	const controls = getControls({ t });
	return controls.map((control) => {
		const { name } = control;

		return { ...control, value: values[name] || '' };
	});
};

export default getBillingAddressControls;
