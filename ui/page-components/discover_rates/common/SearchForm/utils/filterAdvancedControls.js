import getShowElement from './getShowElement';

import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';
import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();
const countrySpecificData = getCountrySpecificData({
	country_id    : geo?.country?.id,
	accessorType  : 'navigations',
	accessor      : 'search_form',
	isDefaultData : false,
});

const filterAdvancedControls = ({
	rawAdvancedControls,
	fields,
	mode,
	location,
	services,
	data,
}) => {
	const { filter_drop_haulage_option_carrier } = countrySpecificData;

	const advControls = rawAdvancedControls.filter((control) => getShowElement(
		control.name,
		{ [control.name]: control, ...fields },
		mode,
		location,
		services,
	));
	const newAdvControls = advControls.map((item) => {
		const value = (data || {})[item.name];
		if (item.name === 'export_transportation_location_id') {
			return { ...item, country_id: location?.origin?.country_id, value };
		}
		if (item.name === 'import_transportation_location_id') {
			return { ...item, country_id: location?.destination?.country_id, value };
		}

		if (item.name === 'import_transportation_pickup_type') {
			return {
				...item,
				value,
				options: item.options.filter((option) => option?.value !== 'ltl'),
			};
		}

		if (
			item?.name === 'drop_haulage_type'
			&& ['direct_port_delivery', 'delivery_from_dock'].includes(
				data?.destination_cargo_handling_type,
			)
			&& filter_drop_haulage_option_carrier
		) {
			return {
				...item,
				value,
				options  : item.options.filter((option) => option?.value !== 'carrier'),
				disabled : true,
			};
		}

		const directPortDeliveryHideCondition1 = !(
			(services?.destination_customs || services?.drop)
			&& mode === 'fcl_freight'
		);
		const directPortDeliveryHideCondition2 =			item?.name === 'destination_cargo_handling_type'
			&& !['INNSA', 'INMAA'].includes(location?.destination?.port_code);
		if (directPortDeliveryHideCondition1 && directPortDeliveryHideCondition2) {
			return {
				...item,
				value,
				options: item.options.filter(
					(option) => option?.value !== 'direct_port_delivery',
				),
			};
		}

		if (
			item?.name === 'have_dpd_code'
			&& !['INNSA', 'INMAA'].includes(location?.destination?.port_code)
		) {
			return {
				...item,
				value   : 'non_dpd',
				options : item.options.filter((option) => option?.value !== 'dpd'),
			};
		}
		return { ...item, value };
	});

	const notAdded = rawAdvancedControls.filter(
		(control) => !getShowElement(
			control.name,
			{ [control.name]: control, ...fields },
			mode,
			location,
			services,
		),
	);
	let toRemoveValues = {};
	notAdded.forEach((control) => {
		if (fields[control.name]) {
			toRemoveValues = { ...toRemoveValues, [control.name]: '' };
		}
	});
	return { newAdvControls, toRemoveValues };
};

export default filterAdvancedControls;
