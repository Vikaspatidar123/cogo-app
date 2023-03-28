import { HAZ_CLASSES } from '@/ui/commons/constants/commodities';

const getFunction = {
	services: (control, services) => {
		const servicesSelected = Object.keys(services).filter((key) => services[key]);
		const intersection = (control.condition.services || []).filter((value) => servicesSelected.includes(value));
		return intersection.length > 0;
	},
	haulage                    : (control, location) => !!(location[control.name.includes('origin') ? 'origin' : 'destination'] || {}).is_icd,
	origin_cargo_handling_type : (control, fieldValues) => control.condition?.origin_cargo_handling_type?.includes(
		fieldValues.origin_cargo_handling_type?.value,
	),
	origin_cfs_cargo_handling_type:
 (control, fieldValues) => control.condition?.origin_cfs_cargo_handling_type?.includes(
 	fieldValues.origin_cfs_cargo_handling_type?.value,
 ),
	origin_pickup_type              : (control, fieldValues) => fieldValues.origin_pickup_type?.value === control.condition?.origin_pickup_type,
	destination_pickup_type         : (control, fieldValues) => fieldValues.destination_pickup_type?.value === control.condition?.destination_pickup_type,
	destination_cargo_handling_type : (control, fieldValues) => control.condition?.destination_cargo_handling_type?.includes(
		fieldValues.destination_cargo_handling_type?.value,
	),
	have_ad_code        : (control, fieldValues) => fieldValues.have_ad_code?.value === control.condition?.have_ad_code,
	have_dpd_code       : (control, fieldValues) => fieldValues.have_dpd_code?.value === control.condition?.have_dpd_code,
	dpd_with_cfs        : (control, fieldValues) => fieldValues.dpd_with_cfs?.value === control.condition?.dpd_with_cfs,
	is_haz              : (control, fieldValues) => HAZ_CLASSES.includes(fieldValues?.commodity?.value),
	inco_term           : (control, fieldValues) => control.condition?.inco_term.includes(fieldValues.inco_term?.value),
	destination_country : (control, location) => (control?.condition?.destination_country || []).includes(location?.destination?.country?.country_code),
};

const getShowElement = (control, fieldValues, mode, location, services) => {
	let flag = true;
	const { condition } = control;
	Object.keys(condition || {}).forEach((conditionName) => {
		flag = flag
			&& (
				getFunction[conditionName]
				|| (() => true)
			)(control, fieldValues, location, services);
	});

	return flag;
};

const getShowElements = (allPresentControls, fieldValues, services, location) => {
	const showElements = {};
	allPresentControls.forEach((control) => {
		showElements[control.name] = getShowElement(control, fieldValues, services, location);
	});

	return showElements;
};
export default getShowElements;
