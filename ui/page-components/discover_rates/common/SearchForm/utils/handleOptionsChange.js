import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getCountryDetails from '@/ui/commons/utils/getCountryDetails';

const customsModes = ['fcl_customs', 'lcl_customs', 'air_customs'];

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const INDIA_COUNTRY_DETAILS = getCountryDetails({
	country_id: INDIA_COUNTRY_ID,
});

const INDIA_COUNTRY_CODE = INDIA_COUNTRY_DETAILS?.country_code;

export const getControls = (controls, formValues, mode, location) => {
	const newControls = [];

	controls.forEach((control) => {
		if (control.name === 'shipping_line_id') {
			// if (formValues.haulage_type === 'carrier') {
			newControls.push({
				...control,
				showMessage: false,
			});
			// }
		} else if (
			customsModes.includes(mode)
			&& control.name?.includes('cargo_handling_type')
		) {
			newControls.push({
				...control,
				showMessage : false,
				options     : (control.options || []).filter(
					(option) => option.trade_type === location?.destination?.value,
				),
			});
		} else if (control.type === 'inco-terms-select') {
			newControls.push({
				...control,
				showMessage: false,
				activeTradeType:
					location?.origin?.country_code === INDIA_COUNTRY_CODE
						? 'export'
						: 'import',
			});
		} else {
			newControls.push({
				...control,
				showMessage: false,
			});
		}
	});
	return newControls;
};

const handleChange = (values, formValues, setFormValues) => {
	const setValues =		values?.haulage_type !== formValues?.haulage_type
		|| values?.trade_type !== formValues?.trade_type;

	if (setValues) {
		setFormValues(values);
	}
};

export default handleChange;
