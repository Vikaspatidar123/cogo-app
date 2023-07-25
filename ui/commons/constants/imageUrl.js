/* eslint-disable max-len */
const IMAGE_URLS = {
	cogoport_logo        : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogoport.svg',
	iec_red_flag         : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/redFlag.svg',
	iec_green_flag       : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/greenflag.svg',
	iec_yellow_flag      : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/yellwflag.svg',
	coin_bag_image       : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/CogoBag.png',
	cart_image           : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Cart-Outline (1).png',
	succes_image         : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/exclamation.svg',
	empty_image          : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/undraw_empty_cart_co35.svg',
	category_image       : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogo_logo_white_bg.svg',
	empty_category_image : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/no category',
	empty_details_image  : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/shipmentEmptyState.png',
	send_gift_image      : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/send.gif',
	banner_image         : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Banner 1.png',
	signatory_image      : 'https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/Vector.png',
	edit_image:
		'https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/animation_500_lhvo6uhx1.png',
	yellow_vessel            : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/shipYellow.png',
	red_vessel               : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/shipRed.png',
	black_vessel             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/shipArrow.png',
	loading                  : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg',
	loading_banner           : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading-banner.svg',
	air_empty_state          : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/air-connect.svg',
	ocean_empty_state        : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ship-cargo.jpg',
	origin_map_pointer       : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/map_origin.svg',
	destination_map_pointer  : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/map_destination.svg',
	map_loading              : 'https://cogoport-maps.s3.ap-south-1.amazonaws.com/world+(2).svg',
	empty_state_finder       : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ic-empty-doc_app.svg',
	ship_icon                : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/shipIcon.jpg',
	truck_icon               : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/truckIcon.png',
	air_icon2                : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/airplane.png',
	tracking_loader          : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/cogo-animation.gif',
	extract_data             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Data-extraction.jpg',
	container_icon           : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/icdport.svg',
	air_icon                 : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/airicon.svg',
	unsubscription_cargo     : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/page_cargo.png',
	unsubscription_bottle    : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Bottle.png',
	unsubscription_plane     : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/page_plane.png',
	insurance_empty_image    : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Insurance.png',
	kyc_dialog_image         : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nogstIcon.svg',
	secure_icon              : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/secure-icon.svg',
	heading_icon             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/heading.svg',
	sub_heading_icon         : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/subheading.svg',
	loading_icon             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/loading.svg',
	no_data_icon             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/nodata.svg',
	payment_icon             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/payment.svg',
	secure_profile_icon      : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/secure-profile-icon.svg',
	no_schedules_found_image : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg',
	archive_icon             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/archive.svg',
	empty_state              : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty_icon 1.svg',
	globe                    : 'https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/globe-language.png',
	cogoport_image:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/e845419ea5eacebda858bad8b20d2797/cogoport-logo.svg',
	pen_image        : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/tds-doc-icon.svg',
	premium_image    : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/crown_new.svg',
	loader           : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/spinner.svg',
	document_icon    : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/document_icon.png',
	web_bot_icon     : 'https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/web_bot',
	animated_web_bot : 'https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/animated_bot.gif',
	track_image      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/delayClock.svg',
	clock_image      : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/green_clock.svg',
	road_map_image   : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/road-map.svg',
	pay_later_widget : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/newadd.svg',
	company_logo:
	'https://cogoport-production.sgp1.digitaloceanspaces.com/92f7f7340ff071a93fcacfca9956b32a/company-info-icon.svg',
	neo_background_image       : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/backgroundNeo.png',
	vault_lock_image           : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/lock 2.svg',
	calendar_image             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/date.png',
	card_background_line_image : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/line.png',
	limited_image              : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/Limited.svg',
	unlimted_image             : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/unlimted.svg',
	empty_sub_image            : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ICSad.svg',
	success_image              : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/success.svg',
	active_image               : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/activate-icon.svg',
	custom_image:
		'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/reshot-icon-checklist-YUWL2XGFTQ%202.png',
	custom_hover_image:
		'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/reshot-icon-checklist-YUWL2XGFTQ%201.svg',
	cogoport_avatar:
		'https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/avatar-placeholder.webp',
	spinner_loader            : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-spinner.svg',
	logo_without_footer       : 'https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/logo-cogoport.svg',
	create_ticket_empty_state : 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-state.svg',
	empty_url                 : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/empty-item.svg',
	dollar_url                : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/dollar.svg',
	green_image               : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/green-rect.svg',
	orange_image              : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/orange-rect.svg',
	payment_loading           : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/ic-spinner_app.svg',
	invoices_image            : 'https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/invoices_app.svg',
	iec:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/c8cfaa65c6d3e59b38d13e0900985e18/IEC_format%20%281%29.png',
	gst:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/95c72c88842372e66c57bbdf221ebeb5/GST-Registration-Certificate-Sample-Annexure-A%20%281%29.png',
	incorporation_certificate:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/b0e35c0aa25953e5e08e5644cd396420/Certificate-Of-Incorporation.jpeg',
	memorandum:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/02bdaad19978dbb68f367485bfe19bf2/MOA-AOA_sample%20template%20%281%29.png',
	bank_letterhead:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/c49dce5b0e71e0c3d8845b007e46eb9b/Bank%20Authorisation%20Letter%20-%20New%20%281%29.pdf',
	gst_return_form_3b:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/dc278220e954a2c54cf65be2684c1e23/GSTR-3B-Return-Format%20%281%29.png',
	authorization_letter_cha:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/a554c3cdb8e16a1c9de7fa18e95959ff/CHA%20authority%20letter%20format%20copy%20%281%29.tiff',
	kyc:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/739799d6ba4ee67a4098765d32a67058/KYC%20%281%29%20%281%29.pdf',
	board_resolution:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/b65deadb0adb1a7216ff06ab13ab2161/Template-NonGovt-BoardResolution-2021_page-0001-724x1024%20%281%29.jpeg',
	letter_to_custom_commissioner:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/ab637cead9e949aada5115faf89871b4/Covering%20Letter-Request%20letter%20to%20Assis%3Adeputy%20commissionar.doc',
	ad_code_letter:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/2ed56b771e89c3f7f77edc002776bfa8/authorized-dealership-ad-code-letter-format%20%281%29.jpeg',
	lut_copy:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/98432eb67e0dd4c09fcaca028fda3658/letter-of-undertaking-lut-%20%281%29.jpeg',
	membership_certificate:
		'https://cogoport-production.sgp1.digitaloceanspaces.com/ca59d74941869eb1ebd5ee85fd8d445d/RCMC%20%281%29%20%281%29.pdf',
};

export default IMAGE_URLS;
