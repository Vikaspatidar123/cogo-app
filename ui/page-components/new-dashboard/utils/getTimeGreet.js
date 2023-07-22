const getTimeGreet = ({ t }) => {
	const curHr = new Date().getHours();

	if (curHr < 12) {
		return {
			message: t('dashboard:greetings_morning'),
		};
	}

	if (curHr < 16) {
		return {
			message: t('dashboard:greetings_noon'),
		};
	}

	if (curHr < 19) {
		return {
			message: t('dashboard:greetings_evening'),
		};
	}

	return {
		message: t('dashboard:greetings_evening'),
	};
};

export default getTimeGreet;
