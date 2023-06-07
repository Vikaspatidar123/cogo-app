import Slider from '../Business/Slider';

import AsyncSelectController from './AsyncSelectController';
import CheckboxController from './CheckboxController';
import CheckboxGroupController from './CheckboxGroupController';
import ChipsController from './ChipController';
import ControlledCommodityCon from './ControlledCommodityCon';
import CountrySelectController from './CountrySelectController';
import CreatableSelectController from './CreatableSelectController';
import DatepickerController from './DatepickerController';
import IncoTermSelectController from './IncoTermSelect';
import InputController from './InputController';
import InputGroupController from './InputGroupController';
import InputNumberController from './InputNumberController';
import MobileNumberSelectController from './MobileNumberSelectController';
import MultiselectController from './MultiSelectController';
import PriceController from './PriceController';
import RadioController from './RadioController';
import RadioGroupController from './RadioGroupController';
import SelectController from './SelectController';
import SliderController from './SliderController';
import TextAreaController from './TextAreaController';
import UploadController from './UploadController';

const MAPPING = {
	select                     : SelectController,
	text                       : InputController,
	number                     : InputController,
	textarea                   : TextAreaController,
	file                       : UploadController,
	checkbox                   : CheckboxController,
	mobile_number              : MobileNumberSelectController,
	datepicker                 : DatepickerController,
	multi_select               : MultiselectController,
	async_select               : AsyncSelectController,
	radio                      : RadioController,
	price_select               : PriceController,
	chips                      : ChipsController,
	country_select             : CountrySelectController,
	radiogroup                 : RadioGroupController,
	slider                     : SliderController,
	'container_type-commodity' : ControlledCommodityCon,
	'input-group'              : InputGroupController,
	'inco-terms-select'        : IncoTermSelectController,
	checkboxGroup              : CheckboxGroupController,
	email                      : InputController,
	custom_slider              : Slider,
	'creatable-select'         : CreatableSelectController,
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
