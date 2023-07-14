const app_settings = [
	{
		api          : 'get_user',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'update_user',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'list_organization_user_invitations',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_user',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'delete_organization_user_invitation',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'verify_user_mobile',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'list_organization_users',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_user_invitation',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_organization',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_addresses',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_address',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_address',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_pocs',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_poc',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_poc',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'verify_user_whatsapp',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'list_trade_contents',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'create_trade_content',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'update_trade_content',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'list_trade_contacts',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'create_trade_contact',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'update_trade_contact',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'list_trade_products',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'create_trade_product',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'update_trade_product',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'list_trade_signatures',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'create_trade_signature',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'update_trade_signature',
		access_type  : 'private',
		service_name : 'trade',
	},
	{
		api          : 'get_user_session',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'get_organization_services',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_service',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_trade_requirements',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_billing_addresses',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_billing_address',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_billing_address',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_organization_branch',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_branch',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_user_branch',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_billing_address_branch',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'list_organization_branches',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_branch',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_organization_communication_detail',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'get_user_alert_preference',
		access_type  : 'private',
		service_name : 'communication_control',
	},
	{
		api          : 'update_user_alert_preference',
		access_type  : 'private',
		service_name : 'communication_control',
	},
	{
		api          : 'list_organization_trade_parties',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'update_organization_user_details',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'login_user',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'resend_lead_verification_email',
		access_type  : 'private',
		service_name : 'lead',
	},
	{
		api          : 'create_organization',
		access_type  : 'private',
		service_name : 'organization',
	},
	{
		api          : 'create_saas_sign_up_lead_user',
		access_type  : 'private',
		service_name : 'lead',
	},
	{
		api          : 'send_login_otp',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'login_user_with_mobile',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'reset_user_password',
		access_type  : 'private',
		service_name : 'user',
	},
	{
		api          : 'create_sign_up_lead_user',
		access_type  : 'private',
		service_name : 'lead',
	},
	{
		api          : 'verify_sign_up_lead_user',
		access_type  : 'private',
		service_name : 'lead',
	},
	{
		api          : 'resend_lead_verification_otp',
		access_type  : 'private',
		service_name : 'lead',
	},
	{
		api          : 'delete_user_session',
		access_type  : 'private',
		service_name : 'user',
	},
];

export default app_settings;
