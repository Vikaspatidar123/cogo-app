export const APP_EVENT = {
	// Auth Events
	auth_signed_up: 'App: Auth: Signed up',
	auth_confirmed_otp_for_mobile_verification:
		'App: Auth: Confirmed OTP for mobile verification',
	auth_logged_in_via_email: 'App: Auth: Logged in via email',
	auth_requested_otp_for_login: 'App: Auth: Requested OTP for login',
	auth_logged_in_via_mobile: 'App: Auth: Logged in via mobile',
	auth_requested_reset_password: 'App: Auth: Requested reset password',
	needed_help: 'App: Auth: Needed Help',

	// Onboarding Events
	ie_onboarding_skipped_billing_address:
		'App: IE Onboarding: Skipped billing address',
	ie_onboarding_added_billing_address:
		'App: IE Onboarding: Added billing address',
	ie_onboarding_edited_billing_address:
		'App: IE Onboarding: Edited billing address',
	ie_onboarding_submitted_company_details:
		'App: IE Onboarding: Submitted company details',
	kyc_requested_verfication: 'App: KYC: Requested verification',

	// Checkout Events
	checkout_created_trade_contact: 'App: Checkout: Created trade contact',
	checkout_created_billing_address: 'App: Checkout: Created billing address',
	checkout_changed_payment_method: 'App: Checkout: Changed payment method',
	checkout_changed_currency: 'App: Checkout: Changed currency',
	checkout_changed_invoicing_parties:
		'App: Checkout: Changed - Invoicing Parties',
	checkout_confirmed_booking: 'App: Checkout: Confirmed booking',
	checkout_changed_consent_to_tc: 'App: Checkout: Changed consent to T&C',

	// Search Events
	search_past_spot_rates: 'App: Search: Searched via past search',
	search_searched_rates: 'App: Search: Searched rates',
	search_clicked_on_edit_search: 'App: Search: Clicked on edit search',
	search_booked_rate: 'App: Search: Booked rate',
	search_viewed_rate_breakup: 'App: Search: Viewed rate breakup',
	search_sorted_search_results: 'App: Search: Sorted search results',
	search_added_additional_service: 'App: Search: Added additional service',
	search_searched_recommended_spot_rates:
		'App: Search: Searched via recommended rates',
};

export const PARTNER_EVENT = {
	// Auth Events
	auth_logged_in: 'Partner: Auth: Logged In',

	// Onboarding Events
	onboarding_submitted_create_lead_company:
		'Partner: Onboarding: Submitted create lead company',
	onboarding_submitted_create_lead_contact:
		'Partner: Onboarding: Submitted create lead contact',
	onboarding_uploaded_lead_csv: 'Partner: Onboarding: Uploaded lead CSV',

	// IE Onboarding Events
	ie_onboarding_added_company_details:
		'Partner: IE Onboarding: Added company details',
	ie_onboarding_added_user_details:
		'Partner: IE Onboarding: Added user details',
	ie_onboarding_submitted_all_details:
		'Partner: IE Onboarding: Submitted all details',
	ie_onboarding_submitted_billing_address:
		'Partner: IE Onboarding: Submitted billing address',
	ie_onboarding_uploaded_multiple_company_docs:
		'Partner: IE Onboarding: Uploaded multiple company docs',
	ie_onboarding_clicked_on_visit_account_details:
		'Partner: IE Onboarding: Clicked on visit account details',

	// Onboarding KYC Events
	kyc_requested_verfication: 'Partner: KYC: Requested verification',
	kyc_approved_verification: 'Partner: KYC: Approved verification',
	kyc_rejected_verification: 'Partner: KYC: Rejected verification',

	// Search Events
	search_searched_rates: 'Partner: Search: Searched rates',

	// Enquiry Events
	enquiry_created_enquiry: 'Partner: Enquiry: Created enquiry',

	// Pre-Checkout Events
	pre_checkout_submitted_checkout_margin:
		'Partner: Pre Checkout: Submitted checkout margin',
	pre_checkout_cancelled_margin_approval_request:
		'Partner: Pre Checkout: Cancelled margin approval request',
	pre_checkout_sent_margin_approval_request:
		'Partner: Pre Checkout: Sent margin approval request',
	pre_checkout_changed_group_by_line_items:
		'Partner: Pre Checkout: Changed group by line items',

	// Checkout Events
	checkout_changed_currency: 'Partner: Checkout: Changed currency',
	checkout_copied_quotation_link: 'Partner: Checkout: Copied quotation link',
	checkout_changed_invoicing_parties:
		'Partner: Checkout: Changed invoicing parties',
	checkout_create_billing_address: 'Partner: Checkout: Created billing address',
	checkout_created_trade_contact: 'Partner: Checkout: Created trade contact',
	checkout_change_payment_method: 'Partner: Checkout: Changed payment method',
	checkout_added_additional_tc: 'Partner: Checkout: Added additional T&C',
	checkout_added_ops_executive: 'Partner: Checkout: Added ops executive',
	checkout_created_ops_executive: 'Partner: Checkout: created ops executive',
	checkout_uploaded_booking_proof: 'Partner: Checkout: Uploaded booking proof',
	checkout_confirm_booking: 'Partner: Checkout: Confirmed booking',
	checkout_changed_consent_to_tc: 'Partner: Checkout: Changed consent to T&C',
	checkout_sent_quotation: 'Partner: Checkout: Sent quotation',
};
