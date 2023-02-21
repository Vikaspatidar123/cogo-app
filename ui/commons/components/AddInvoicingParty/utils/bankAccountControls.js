import { IcMCloudUpload } from '@cogoport/icons-react';

const getControls = ({ t = () => {} }) => {
	const translationKey =
		'common:components.addInvoicingParty.utils.controls.bankAccountControls';

	return [
		{
			name: 'ifsc_number',
			label: t(`${translationKey}.ifsc_number.label`),
			type: 'text',
			style: {
				flexBasis: '50%',
			},
			rules: {
				required: t(`${translationKey}.ifsc_number.rules.required`),
			},
		},
		{
			name: 'account_holder_name',
			label: t(`${translationKey}.account_holder_name.label`),
			type: 'text',
			style: {
				flexBasis: '50%',
			},
			rules: { required: true },
		},
		{
			name: 'bank_account_number',
			label: t(`${translationKey}.bank_account_number.label`),
			type: 'text',
			style: {
				flexBasis: '50%',
			},
			rules: {
				required: t(`${translationKey}.bank_account_number.rules.required`),
			},
		},
		{
			name: 'bank_name',
			label: t(`${translationKey}.bank_name.label`),
			type: 'text',
			style: {
				flexBasis: '50%',
			},
			rules: { required: true },
		},
		{
			name: 'branch_name',
			label: t(`${translationKey}.branch_name.label`),
			type: 'text',
			style: {
				flexBasis: '50%',
			},
			themeType: 'small',
			rules: {
				required: t(
					`${translationKey}.bank_account_number.label.rules.required`,
				),
			},
		},
		{
			name: 'image_url',
			label: t(`${translationKey}.image_url.label`),
			type: 'file',
			drag: true,
			uploadIcon: () => <IcMCloudUpload width={24} height={24} />,
			style: {
				flexBasis: '50%',
			},
			uploadType: 'aws',
			height: 45,
			rules: { required: true },
		},
	];
};

const getBankAccountControls = ({ values = {}, t = () => {} }) => {
	const controls = getControls({ t });
	return controls.map((control) => {
		const { name = '' } = control;
		const { data = {} } = values;

		if (name === 'image_url') {
			return { ...control, value: values[name] || '' };
		}

		return { ...control, value: data[name] || values[name] || '' };
	});
};

export default getBankAccountControls;
