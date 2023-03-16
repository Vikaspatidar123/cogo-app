const patterns = {
	PAN_NUMBER       : /[A-Za-z]{5}\d{4}[A-Za-z]{1}/g,
	EMAIL            : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
	CONTAINER_NUMBER : /^[A-Z]{3}U[0-9]{6,7}$/,
	MOBILE           : /^[0-9]{10}$/,
	GST_NUMBER:
		/\d{2}[A-Za-z]{5}\d{4}[A-Za-z]{1}[A-Za-z\d]{1}[Zz]{1}[A-Za-z\d]{1}/g,
	VIETNAM_TAX : /^0[1-3]{1}[0-9]{8}$|^0[1-3]{1}[0-9]{8}-?[0-9]{3}$/,
	MOBILE      : /^[0-9]{10}$/,
	PASSWORD    : {
		PASSWORD_PATTERN : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/gm,
		lowercase        : /[a-z]/gm,
		uppercase        : /[A-Z]/gm,
		digit            : /[0-9]/gm,
		special          : /[!@#$%^&*]/gm,
		minLength        : /[a-zA-Z0-9!@#$%^&*]{8,}/gm,
	},
};

export default patterns;
