import { useEffect, useState } from 'react';

const useCountdown = (targetDate) => {
	const countDownDate = targetDate;
	const [countDown, setCountDown] = useState(countDownDate - new Date());

	const getReturnValues = (count) => {
		let timeLeft = {};
		let hours = '';
		let minutes = '';
		let seconds = '';
		if (count > 0) {
			const h = Math.floor(count / (1000 * 60 * 60));
			const m = Math.floor((count / 1000 / 60) % 60);
			const s = Math.floor((count / 1000) % 60);

			if (h > 0 && h < 10) {
				hours = `0${h}`;
			} else if (h > 10) {
				hours = h;
			} else {
				hours = '00';
			}

			if (m > 0 && m < 10) {
				minutes = `0${m}`;
			} else if (m > 9 && m <= 59) {
				minutes = m;
			} else {
				minutes = '00';
			}

			if (s > 0 && s < 10) {
				seconds = `0${s}`;
			} else if (s > 9 && s <= 59) {
				seconds = s;
			} else {
				seconds = '00';
			}

			timeLeft = {
				hours,
				minutes,
				seconds,
			};
		}

		return timeLeft;
	};

	useEffect(() => {
		let interval = {};
		if (new Date(countDownDate) - new Date() > 0) {
			interval = setInterval(() => {
				setCountDown(new Date(countDownDate) - new Date());
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [countDownDate]);

	return getReturnValues(countDown);
};

export default useCountdown;
