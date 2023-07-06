export const getMilestone = ({ airCargoDetails = {} }) => ({
	origin        : 'Origin',
	portLoading   : airCargoDetails?.origin || 'Port of Loading',
	portDischarge : airCargoDetails?.destination || 'Port of discharge',
	destination   : 'Destination',
});
