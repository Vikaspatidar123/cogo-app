/**
 * Analytics function for unidentifying user
 */
const resetUser = () => {
	if (typeof window !== 'undefined' && window.dataLayer) {
		const eventData = {
			_type: 'user_reset',
			event: 'User Reset',
		};

		window.dataLayer.push(eventData);
	}
};

export default resetUser;
