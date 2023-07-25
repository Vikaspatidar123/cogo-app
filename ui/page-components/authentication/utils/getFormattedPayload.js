const getFormattedPayload = (props) => {
	const { formValues = {}, leadUserId = '', is_whatsapp_number = false } = props;
	const { name, email, mobile_number } = formValues;

	return {
		lead_user_id        : leadUserId || undefined,
		name                : name || undefined,
		email               : email || undefined,
		mobile_country_code : mobile_number?.country_code || undefined,
		mobile_number       : mobile_number?.number || undefined,
		is_whatsapp_number,
	};
};

export default getFormattedPayload;
