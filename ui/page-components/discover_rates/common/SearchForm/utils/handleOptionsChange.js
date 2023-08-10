import getGeoConstants from '@/ui/commons/constants/geo';

const CUSTOMS_MODES = ['fcl_customs', 'lcl_customs', 'air_customs'];
const CARGO_HANDLING_TYPE = 'cargo_handling_type';

export const getControls = (controls, formValues, mode, location) => {
	const geo = getGeoConstants();
	const isExportTradeType = geo.others.navigations.search_form.is_export_tradeType;

	const newControls = controls.map((control) => {
		if (control.name === 'shipping_line_id') {
			return {
				...control,
				showMessage: false,
			};
		}
		if (CUSTOMS_MODES.includes(mode) && control.name?.includes(CARGO_HANDLING_TYPE)) {
			return {
				...control,
				showMessage : false,
				options     : (control.options || []).filter(
					(option) => option.trade_type === location?.destination?.value,
				),
			};
		}
		if (control.type === 'inco-terms-select') {
			return {
				...control,
				showMessage     : false,
				activeTradeType : isExportTradeType ? 'export' : 'import',
			};
		}
		return {
			...control,
			showMessage: false,
		};
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
