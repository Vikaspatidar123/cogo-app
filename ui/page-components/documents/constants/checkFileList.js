import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function checkFileList(t, serviceType) {
	let list = [];

	const ocean = [
		{
			doc_name : t('documents:custom_service_doc_1'),
			doc_type : 'kyc_docs',
		},
		{
			doc_name : t('documents:custom_service_doc_2'),
			doc_type : 'kyc_docs',
		},
		{
			doc_name : t('documents:custom_service_doc_3'),
			doc_type : 'kyc_docs',
		},
		{
			doc_name    : t('documents:custom_service_doc_4'),
			doc_type    : 'kyc_docs',
			sample_link : GLOBAL_CONSTANTS.image_url.iec,
		},
		{
			doc_name    : t('documents:custom_service_doc_5'),
			doc_type    : 'company_tax_docs',
			sample_link : GLOBAL_CONSTANTS.image_url.gst,
		},
		{
			doc_name    : t('documents:custom_service_doc_6'),
			doc_type    : 'company_registration_docs',
			sample_link : GLOBAL_CONSTANTS.image_url.incorporation_certificate,
		},
		{
			doc_name    : t('documents:custom_service_doc_7'),
			doc_type    : 'company_registration_docs',
			sample_link : GLOBAL_CONSTANTS.image_url.memorandum,
		},
		{
			doc_name : t('documents:custom_service_doc_8'),
			doc_type : 'company_registration_docs',
		},
		{
			doc_name    : t('documents:custom_service_doc_9'),
			doc_type    : 'company_financial_docs',
			sample_link : GLOBAL_CONSTANTS.image_url.bank_letterhead,
		},
		{
			doc_name    : t('documents:custom_service_doc_10'),
			doc_type    : 'company_tax_docs',
			sample_link : GLOBAL_CONSTANTS.image_url.gst_return_form_3b,
		},
		{
			doc_name    : t('documents:custom_service_doc_11'),
			doc_type    : 'company_general_docs',
			sample_link : GLOBAL_CONSTANTS.image_url.authorization_letter_cha,
		},
		{
			doc_name    : t('documents:custom_service_doc_12'),
			doc_type    : 'kyc_docs',
			sample_link : GLOBAL_CONSTANTS.image_url.kyc,
		},
		{
			doc_name : t('documents:custom_service_doc_13'),
			doc_type : 'company_tax_docs',
		},
		{
			doc_name : t('documents:custom_service_doc_14'),
			doc_type : 'company_financial_docs',
		},
		{
			doc_name    : t('documents:custom_service_doc_15'),
			doc_type    : 'company_registration_docs',
			sample_link : GLOBAL_CONSTANTS.image_url.board_resolution,
		},
		{
			doc_name : t('documents:custom_service_doc_16'),
			doc_type : 'company_registration_docs',
		},
		{
			doc_name : t('documents:custom_service_doc_17'),
			doc_type : 'kyc_docs',
		},
		{
			doc_name    : t('documents:custom_service_doc_18'),
			doc_type    : 'company_general_docs',
			sample_link : GLOBAL_CONSTANTS.image_url.letter_to_custom_commissioner,
		},
		{
			doc_name : t('documents:custom_service_doc_19'),
			doc_type : 'company_financial_docs',
		},
		{
			doc_name : t('documents:custom_service_doc_20'),
			doc_type : 'company_financial_docs',
		},
		{
			doc_name    : t('documents:custom_service_doc_21'),
			doc_type    : 'company_financial_docs',
			sample_link : GLOBAL_CONSTANTS.image_url.ad_code_letter,
		},
		{
			doc_name : t('documents:custom_service_doc_22'),
			doc_type : 'company_financial_docs',
		},
		{
			doc_name    : t('documents:custom_service_doc_23'),
			doc_type    : 'company_tax_docs',
			sample_link : GLOBAL_CONSTANTS.image_url.lut_copy,
		},
		{
			doc_name    : t('documents:custom_service_doc_24'),
			doc_type    : 'company_general_docs',
			sample_link : GLOBAL_CONSTANTS.image_url.membership_certificate,
		},
	];

	if (['fcl_customs_service', 'lcl_customs_service']?.includes(serviceType)) {
		list = ocean;
	}

	return list;
}

export default checkFileList;
