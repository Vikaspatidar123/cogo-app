async function validateMobileNumber(props) {
	const { setCustomError, fetchLeadUserTrigger, payload, t } = props;

	try {
		await fetchLeadUserTrigger({
			data: payload,
		});

		setCustomError('');
		return true;
	} catch (error) {
		setCustomError(t('authentication:signup_mobile_error'));

		return false;
	}
}

export default validateMobileNumber;
