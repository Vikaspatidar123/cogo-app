import CheckboxController from './CheckboxController';
import InputController from './InputController';
import SelectController from './SelectController';
import TextAreaController from './TextAreaController';
import FileUploader from './UploadController';

const MAPPING = {

	select   : SelectController,
	text     : InputController,
	number   : InputController,
	textarea : TextAreaController,
	file     : FileUploader,
	checkbox : CheckboxController,

};

const getField = (type = 'text') => {
	const element = MAPPING[type];

	if (!element) {
		// TODO remove this, and throw an error
		return <div>No element found</div>;
	}

	return element;
};

export default getField;
