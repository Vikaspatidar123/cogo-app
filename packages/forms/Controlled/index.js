import InputController from './InputController';
import SelectController from './SelectController';

const mapping = {

	select : SelectController,
	text   : InputController,
	number : InputController,

};

const getField = (type = 'text') => {
	const element = mapping[type];

	if (!element) {
		// TODO remove this, and throw an error
		return <div>No element found</div>;
	}

	return element;
};

export default getField;
