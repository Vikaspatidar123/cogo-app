import airControls from './create-air-rfq-controls';
import fclControls from './create-fcl-rfq-controls';
import lclControls from './create-lcl-rfq-controls';

const controls = (type) => {
	if (type === 'fcl_freight') {
		return fclControls;
	}
	if (type === 'lcl_freight') {
		return lclControls;
	}
	if (type === 'air_freight') {
		return airControls;
	}

	return [];
};

export default controls;
