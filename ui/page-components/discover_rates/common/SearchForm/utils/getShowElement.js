import { HAZ_CLASSES } from '@/ui/commons/constants/commodities';

const getFunction = {
	services: (field, fields, mode, location, services) => {
		const servicesSelected = Object.keys(services).filter((key) => services[key]);
		const intersection = (field.condition.services || []).filter((value) => servicesSelected.includes(value));
		return intersection.length > 0;
	},
	haulage                    : (field, fields, mode, location) => !!(location[field.name.includes('origin') ? 'origin' : 'destination'] || {}).is_icd,
	origin_cargo_handling_type : (field, fields) => field.condition?.origin_cargo_handling_type?.includes(
		fields.origin_cargo_handling_type?.value,
	),
	origin_cfs_cargo_handling_type: (field, fields) => field.condition?.origin_cfs_cargo_handling_type?.includes(
		fields.origin_cfs_cargo_handling_type?.value,
	),
	export_transportation_pickup_type : (field, fields) => fields.export_transportation_pickup_type?.value === field.condition?.export_transportation_pickup_type,
	import_transportation_pickup_type : (field, fields) => fields.import_transportation_pickup_type?.value === field.condition?.import_transportation_pickup_type,
	destination_cargo_handling_type   : (field, fields) => field.condition?.destination_cargo_handling_type?.includes(
		fields.destination_cargo_handling_type?.value,
	),
	have_ad_code        : (field, fields) => fields.have_ad_code?.value === field.condition?.have_ad_code,
	have_dpd_code       : (field, fields) => fields.have_dpd_code?.value === field.condition?.have_dpd_code,
	dpd_with_cfs        : (field, fields) => fields.dpd_with_cfs?.value === field.condition?.dpd_with_cfs,
	is_haz              : (field, fields) => HAZ_CLASSES.includes(fields?.commodity?.value),
	inco_term           : (field, fields) => field.condition?.inco_term.includes(fields.inco_term?.value),
	destination_country : (field, fields, mode, location) => (field?.condition?.destination_country || []).includes(location?.destination?.country?.country_code),
};

const getShowElement = (name, fields, mode, location, services) => {
	let flag = true;

	const field = fields[name];
	const { condition } = field;
	Object.keys(condition || {}).forEach((conditionName) => {
		flag = flag
			&& (
				getFunction[conditionName]
				|| (() => true)
			)(field, fields, mode, location, services);
	});

	return flag;
};

export default getShowElement;
