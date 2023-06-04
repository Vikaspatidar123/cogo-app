import AsyncSelectController from './AsyncSelectController';
import CheckboxController from './CheckboxController';
import CheckboxGroupController from './CheckboxGroupController';
import ChipsController from './ChipController';
import CountrySelectController from './CountrySelectController';
import DatepickerController from './DatepickerController';
import InputController from './InputController';
import InputGroupController from './InputGroupController';
import MobileNumberSelectController from './MobileNumberSelectController';
import MultiselectController from './MultiSelectController';
import PriceController from './PriceController';
import RadioController from './RadioController';
import RadioGroupController from './RadioGroupController';
import SelectController from './SelectController';
import TextAreaController from './TextAreaController';
import UploadController from './UploadController';

const MAPPING = {
	select             : SelectController,
	text               : InputController,
	number             : InputController,
	textarea           : TextAreaController,
	file               : UploadController,
	checkbox           : CheckboxController,
	mobile_number      : MobileNumberSelectController,
	datepicker         : DatepickerController,
	multi_select       : MultiselectController,
	async_select       : AsyncSelectController,
	radio              : RadioController,
	price_select       : PriceController,
	chips              : ChipsController,
	email              : InputController,
	'creatable-select' : SelectController,
	'input-group'      : InputGroupController,
	checkboxGroup      : CheckboxGroupController,
	radiogroup         : RadioGroupController,
	country_select     : CountrySelectController,
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
