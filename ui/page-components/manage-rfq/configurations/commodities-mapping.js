const STANDARD_COMMODITIES = [
	'white_goods',
	'pta',
	'cotton_and_yarn',
	'fabric_and_textiles',
	'sugar_rice',
];

export const HAZ_CLASSES = [
	'gases-2.1',
	'gases-2.2',
	'gases-2.3',
	'flammable_liquids-3',
	'flammable_solids-4.1',
	'flammable_solids_self_heat-4.2',
	'emit_flammable_gases_with_water-4.3',
	'imo_classes-5.1',
	'toxic_substances-6.1',
	'infectious_substances-6.2',
	'radioactive_material-7',
	'corrosives-8',
	'miscellaneous_dangerous_goods-9',
];

export const FCL_CUSTOMS_CONTAINER_COMMODITY_MAPPING = {
	standard  : [null, ...STANDARD_COMMODITIES, ...HAZ_CLASSES],
	refer     : [null],
	open_top  : [null],
	flat_rack : [null],
	open_side : [null],
	iso_tank  : [null, ...HAZ_CLASSES],
};
