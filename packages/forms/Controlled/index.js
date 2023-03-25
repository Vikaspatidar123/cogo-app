import { MultiselectController } from '..';

import AsyncSelectController from './AsyncSelectController';
import CheckboxController from './CheckboxController';
import ChipsController from './ChipController';
import ControlledCommodityCon from './ControlledCommodityCon';
import DatepickerController from './DatepickerController';
import IncoTermSelectController from './IncoTermSelect';
import InputController from './InputController';
import InputGroupController from './InputGroupController';
import InputNumberController from './InputNumberController';
import MobileNumberSelectController from './MobileNumberSelectController';
import SelectController from './SelectController';
import TextAreaController from './TextAreaController';
import UploadController from './UploadController';

const MAPPING = {
	select                     : SelectController,
	text                       : InputController,
	number                     : InputNumberController,
	textarea                   : TextAreaController,
	file                       : UploadController,
	checkbox                   : CheckboxController,
	mobile_number              : MobileNumberSelectController,
	datepicker                 : DatepickerController,
	multi_select               : MultiselectController,
	async_select               : AsyncSelectController,
	'inco-terms-select'        : IncoTermSelectController,
	chips                      : ChipsController,
	'container_type-commodity' : ControlledCommodityCon,
	'input-group'              : InputGroupController,

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
