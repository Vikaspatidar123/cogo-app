import { MORANING_TIME, NOON_TIME, EVENING_TIME } from '../constant';

const getTimeGreet = ({ t }) => {
	const curHr = new Date().getHours();

	if (curHr < MORANING_TIME) {
		return {
			message: t('dashboard:greetings_morning'),
		};
	}

	if (curHr < NOON_TIME) {
		return {
			message: t('dashboard:greetings_noon'),
		};
	}

	if (curHr < EVENING_TIME) {
		return {
			message: t('dashboard:greetings_evening'),
		};
	}

	return {
		message: t('dashboard:greetings_evening'),
	};
};

export default getTimeGreet;
