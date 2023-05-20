import React, { useState, useEffect } from 'react';

import { Container } from './styles';

function Timer(props) {
	const { initialMinute = 0, initialSeconds = 0 } = props;
	const [minutes, setMinutes] = useState(initialMinute);
	const [seconds, setSeconds] = useState(initialSeconds);
	useEffect(() => {
		const myInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(myInterval);
				} else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);
		return () => {
			clearInterval(myInterval);
		};
	});
	return (
		<Container style={{ color: '#325398', marginTop: '30px' }}>
			{(minutes === 0 && seconds === 0) ? <h1>00:00</h1> : (
				<h1>
					{' '}
					0
					{minutes}
					:
					{seconds < 10 ? `0${seconds}` : seconds}
				</h1>
			)}
		</Container>

	);
}

export default Timer;
