export const APP_EVENT = {
	// Auth Events
	auth_signed_up: 'App: Auth: Signed up',
	auth_confirmed_otp_for_mobile_verification:
		'App: Auth: Confirmed OTP for mobile verification',
	auth_logged_in_via_email      : 'App: Auth: Logged in via email',
	auth_requested_otp_for_login  : 'App: Auth: Requested OTP for login',
	auth_logged_in_via_mobile     : 'App: Auth: Logged in via mobile',
	auth_requested_reset_password : 'App: Auth: Requested reset password',
	needed_help                   : 'App: Auth: Needed Help',

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
	checkout_created_trade_contact   : 'App: Checkout: Created trade contact',
	checkout_created_billing_address : 'App: Checkout: Created billing address',
	checkout_changed_payment_method  : 'App: Checkout: Changed payment method',
	checkout_changed_currency        : 'App: Checkout: Changed currency',
	checkout_changed_invoicing_parties:
		'App: Checkout: Changed - Invoicing Parties',
	checkout_confirmed_booking     : 'App: Checkout: Confirmed booking',
	checkout_changed_consent_to_tc : 'App: Checkout: Changed consent to T&C',

	// Search Events
	search_past_spot_rates          : 'App: Search: Searched via past search',
	search_searched_rates           : 'App: Search: Searched rates',
	search_clicked_on_edit_search   : 'App: Search: Clicked on edit search',
	search_booked_rate              : 'App: Search: Booked rate',
	search_viewed_rate_breakup      : 'App: Search: Viewed rate breakup',
	search_sorted_search_results    : 'App: Search: Sorted search results',
	search_added_additional_service : 'App: Search: Added additional service',
	search_searched_recommended_spot_rates:
		'App: Search: Searched via recommended rates',
};
