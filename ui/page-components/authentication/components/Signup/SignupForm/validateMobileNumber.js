async function validateMobileNumber(props) {
	const { setCustomError, fetchLeadUserTrigger, payload } = props;

	try {
		await fetchLeadUserTrigger({
			data: payload,
		});

		setCustomError('');
		return true;
	} catch (error) {
		setCustomError('Mobile Number is Invalid');

		return false;
	}
}

export default validateMobileNumber;
