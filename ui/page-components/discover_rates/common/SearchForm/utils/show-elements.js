import { HAZ_CLASSES } from '@/ui/commons/constants/commodities';

const getFunction = {
	services: (control, formValues, mode, location, services) => {
		const servicesSelected = Object.keys(services).filter(
			(key) => services[key],
		);
		const intersection = (control.condition.services || []).filter((value) => servicesSelected.includes(value));
		return intersection.length > 0;
	},
	haulage: (control, formValues, mode, location) => !!(
		location[control.name.includes('export') ? 'origin' : 'destination'] || {}
	).is_icd,
	export_transportation_cargo_handling_type: (control, formValues) => control.condition?.export_transportation_cargo_handling_type?.includes(
		formValues.export_transportation_cargo_handling_type,
	),
	export_cfs_cargo_handling_type: (control, formValues) => control.condition?.export_cfs_cargo_handling_type?.includes(
		formValues.export_cfs_cargo_handling_type,
	),
	export_transportation_pickup_type: (control, formValues) => formValues.export_transportation_pickup_type
		=== control.condition?.export_transportation_pickup_type,
	import_transportation_pickup_type: (control, formValues) => formValues.import_transportation_pickup_type
		=== control.condition?.import_transportation_pickup_type,
	import_transportation_cargo_handling_type: (control, formValues) => control.condition?.import_transportation_cargo_handling_type?.includes(
		formValues.import_transportation_cargo_handling_type,
	),
	have_ad_code        : (control, formValues) => formValues.have_ad_code === control.condition?.have_ad_code,
	have_dpd_code       : (control, formValues) => formValues.have_dpd_code === control.condition?.have_dpd_code,
	dpd_with_cfs        : (control, formValues) => formValues.dpd_with_cfs === control.condition?.dpd_with_cfs,
	is_haz              : (control, formValues) => HAZ_CLASSES.includes(formValues?.commodity),
	is_hazardous        : (control, formValues) => formValues?.commodity === 'hazardous',
	inco_term           : (control, formValues) => control.condition?.inco_term.includes(formValues.inco_term),
	destination_country : (control, formValues, mode, location) => (control?.condition?.destination_country || []).includes(
		location?.destination?.country?.country_code,
	),
	origin_country: (control, formValues, mode, location) => (control?.condition?.origin_country || []).includes(
		location?.origin?.country?.country_code,
	),
	trade_type: (control, formValues) => control.condition.trade_type.includes(formValues.trade_type),
};

const getShowElement = (control, formValues, mode, location, services = {}) => {
	let flag = true;
	const { condition } = control || {};
	Object.keys(condition || {}).forEach((conditionName) => {
		flag =			flag
			&& (getFunction[conditionName] || (() => true))(
				control,
				formValues,
				mode,
				location,
				services,
			);
	});

	return flag;
};

const showElements = ({
	advancedControls,
	formValues,
	mode,
	location,
	services,
	setValue,
	unregister,
}) => {
	const showElementsObj = {};
	advancedControls.forEach((control) => {
		if (control.type === 'fieldArray') {
			const showArray = getShowElement(
				control,
				formValues,
				mode,
				location,
				services,
			);
			if (!showArray && formValues[control.name]) {
				showElementsObj[control.name] = showArray;
				unregister(control.name);
			} else if (formValues[control.name]) {
				const elementsToShow = [];
				formValues[control.name].forEach((itemObj) => {
					const elementsToShowInObj = {};
					Object.keys(itemObj).forEach((key) => {
						const controlItem = control.controls.find(
							(ctrl) => ctrl.name === key,
						);
						elementsToShowInObj[key] = getShowElement(
							controlItem,
							{ ...formValues, ...itemObj },
							location,
							services,
						);
					});
					elementsToShow.push(elementsToShowInObj);
				});
				showElementsObj[control.name] = elementsToShow;
			} else if (showArray) {
				const objToSet = {};
				const elementsToShow = {};
				control.controls.forEach((item) => {
					objToSet[item?.name] = '';
					elementsToShow[item?.name] = true;
				});
				showElementsObj[control.name] = [elementsToShow];
				if (control.name === 'containers') {
					setValue(control.name, [objToSet]);
				}
			} else {
				showElementsObj[control.name] = showArray;
			}
		} else {
			const show = getShowElement(
				control,
				formValues,
				mode,
				location,
				services,
			);
			showElementsObj[control.name] = show;
			// if (!show && control.name in formValues) {
			// 	unregister(control.name);
			// }
		}
	});

	return showElementsObj;
};

export default showElements;
