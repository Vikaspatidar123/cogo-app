const getFormattedPayload = async (props) => {
	const { formValues = {}, leadUserId = '', is_whatsapp_number = false, recaptchaRef } = props;
	const { name, email, mobile_number } = formValues;
	const google_recaptcha_response = await recaptchaRef?.current?.executeAsync();
	return {
		lead_user_id        : leadUserId || undefined,
		name                : name || undefined,
		email               : email || undefined,
		mobile_country_code : mobile_number?.country_code || undefined,
		mobile_number       : mobile_number?.number || undefined,
		is_whatsapp_number,
		google_recaptcha_response,
	};
};

export default getFormattedPayload;
