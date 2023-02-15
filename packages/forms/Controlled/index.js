import InputController from './InputController';
import SelectController from './SelectController';
import TextAreaController from './TextAreaController';
import FileUploader from './UploadController';

const mapping = {

	select   : SelectController,
	text     : InputController,
	number   : InputController,
	textarea : TextAreaController,
	file     : FileUploader,

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
