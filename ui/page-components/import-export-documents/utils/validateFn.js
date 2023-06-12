const validateFn = ({
	verifyHsCode,
	hsCode,
	setStatus,
	transportDetails,
	setValidateInProgress,
}) => {
	const destinationCountryCode = transportDetails?.importCountry?.country_code;
	const validateHSCode = async () => {
		await verifyHsCode({
			hsCode,
			destinationCountryCode,
			setStatus,
			setValidateInProgress,
		});
	};
	return {
		validateHSCode,
	};
};

export default validateFn;
