/**
 * Analytics function for identifying user
 * @param {Object}      	user - User object received from server
 * @param {string} 			[user.id] - A unique ID to identify the user
 * @param {string}			[user.name] - Full Name for the user
 * @param {string}			[user.email] - Email for the user
 * @param {string}			[user.mobile_country_code] - String value indicating users mobile country_code
 * @param {string}			[user.mobile_number] - String value of users mobile number
 */
const identifyUser = (user) => {
	if (typeof window !== 'undefined' && window.dataLayer) {
		const analyticsUser = {
			_type: 'user_identify',
			event: 'User Identify',
		};
		if (user?.id) analyticsUser.user_id = user?.id;
		if (user?.name) analyticsUser.first_name = user?.name;
		if (user?.email) analyticsUser.email = user?.email;
		if (user?.mobile_number)
			analyticsUser.phone = `${user?.mobile_country_code} ${user?.mobile_number}`;

		window.dataLayer.push(analyticsUser);
	}
};

export default identifyUser;
