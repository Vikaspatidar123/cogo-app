import getGeoConstants from '@/ui/commons/constants/geo';

const customsModes = ['fcl_customs', 'lcl_customs', 'air_customs'];

const geo = getGeoConstants();
const { is_export_tradeType } = geo.others.navigations.search_form;

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
				showMessage     : false,
				activeTradeType : is_export_tradeType ? 'export' : 'import',
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
