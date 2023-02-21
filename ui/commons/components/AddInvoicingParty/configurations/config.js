const translationKey =
	'common:components.addInvoicingParty.configurations.config.';

const getConfig = ({ t = () => {} }) => {
	return {
		self: {
			key: 'self',
			label: t(`${translationKey}self.label`),
			contents: [
				{
					key: 'address',
					label: t(`${translationKey}self.contents.address.label`),
					valueKey: 'address',
				},
				{
					key: 'pin_code',
					label: t(`${translationKey}self.contents.pin_code.label`),
					valueKey: 'pinCode',
				},
				{
					key: 'tax_number',
					label: t(`${translationKey}self.contents.tax_number.label`),
					valueKey: 'taxOrGstNumber',
				},
				{
					key: 'gst_proof',
					label: t(`${translationKey}self.contents.gst_proof.label`),
					valueKey: 'gstProof',
				},
				{
					key: 'is_sez',
					label: t(`${translationKey}self.contents.is_sez.label`),
					valueKey: 'isSez',
				},
			],
		},
		trade_partner: {
			key: 'trade_partner',
			label: t(`${translationKey}trade_partner.label`),
			contents: [
				{
					label: t(`${translationKey}trade_partner.contents.companyName.label`),
					valueKey: 'companyName',
				},
				{
					label: t(`${translationKey}trade_partner.contents.pan.label`),
					valueKey: 'pan',
				},
				{
					label: t(`${translationKey}trade_partner.contents.country.label`),
					valueKey: 'country',
				},
				{
					label: t(`${translationKey}trade_partner.contents.tdsRate.label`),
					valueKey: 'tdsRate',
				},
			],
		},
		billing_address: {
			key: 'billing_address',
			label: t(`${translationKey}billing_address.label`),
			contents: [
				{
					label: t(`${translationKey}billing_address.contents.address.label`),
					valueKey: 'address',
				},
				{
					label: t(`${translationKey}billing_address.contents.pinCode.label`),
					valueKey: 'pinCode',
				},
				{
					label: t(
						`${translationKey}billing_address.contents.tax_number.label`,
					),
					valueKey: 'taxOrGstNumber',
				},
				{
					label: t(`${translationKey}billing_address.contents.gst_proof.label`),
					valueKey: 'gstProof',
				},
				{
					label: t(`${translationKey}billing_address.contents.is_sez.label`),
					valueKey: 'isSez',
				},
				{
					label: t(
						`${translationKey}billing_address.contents.viewDocumnet.label`,
					),
					valueKey: 'viewDocument',
				},
				{
					label: t(
						`${translationKey}billing_address.contents.bank_status.label`,
					),
					valueKey: 'bankStatus',
				},
			],
		},
		bank_details: {
			key: 'bank_details',
			label: t(`${translationKey}bank_details.label`),
			contents: [
				{
					label: t(`${translationKey}bank_details.contents.name.label`),
					valueKey: 'accountHolderName',
				},
				{
					label: t(
						`${translationKey}bank_details.contents.bankAccountNumber.label`,
					),
					valueKey: 'bankAccountNumber',
				},
				{
					label: t(`${translationKey}bank_details.contents.bankName.label`),
					valueKey: 'bankName',
				},
				{
					label: t(`${translationKey}bank_details.contents.branchName.label`),
					valueKey: 'branchName',
				},
				{
					label: t(`${translationKey}bank_details.contents.ifscCode.label`),
					valueKey: 'ifscCode',
				},
				{
					label: t(`${translationKey}bank_details.contents.imageUrl.label`),
					valueKey: 'imageUrl',
				},
			],
		},
		poc_details: {
			key: 'poc_details',
			label: t(`${translationKey}poc_details.label`),
			contents: [
				{
					key: 'name',
					label: t(`${translationKey}poc_details.contents.name.label`),
					valueKey: 'pocName',
				},
				{
					key: 'email',
					label: t(`${translationKey}poc_details.contents.email.label`),
					valueKey: 'pocEmailId',
				},
				{
					key: 'mobile_number',
					label: t(`${translationKey}poc_details.contents.mobile_number.label`),
					valueKey: 'pocMobileNumber',
				},
				{
					key: 'alternate_mobile_number',
					label: t(
						`${translationKey}poc_details.contents.alternate_mobile_number.label`,
					),
					valueKey: 'pocAlternateMobileNumber',
				},
				{
					key: 'edit_poc_details',
					label: t(
						`${translationKey}poc_details.contents.edit_poc_details.label`,
					),
					valueKey: 'editPocDetails',
				},
			],
		},
	};
};
export default getConfig;
