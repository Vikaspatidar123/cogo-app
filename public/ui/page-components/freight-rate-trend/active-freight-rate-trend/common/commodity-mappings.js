export const getCommodityOptionMapping = ({ t }) => ({
	standard: [
		{
			label : t('frt:commodity_option_standard_general'),
			value : 'general',
		},
		{
			label : t('frt:commodity_option_standard_white_goods'),
			value : 'white_goods',
		},
		{
			label : t('frt:commodity_option_standard_pta'),
			value : 'pta',
		},
		{
			label : t('frt:commodity_option_standard_cotton_and_yarn'),
			value : 'cotton_and_yarn',
		},
		{
			label : t('frt:commodity_option_standard_fabric_and_textiles'),
			value : 'fabric_and_textiles',
		},
		{
			label : t('frt:commodity_option_standard_sugar_rice'),
			value : 'sugar_rice',
		},
		{
			label : t('frt:commodity_option_standard_gases_2_1'),
			value : 'gases-2.1',
		},
		{
			label : t('frt:commodity_option_standard_gases_2_2'),
			value : 'gases-2.2',
		},
		{
			label : t('frt:commodity_option_standard_gases_2_3'),
			value : 'gases-2.3',
		},
		{
			label : t('frt:commodity_option_standard_flammable_liquids_3'),
			value : 'flammable_liquids-3',
		},
		{
			label : t('frt:commodity_option_standard_flammable_solids_4_1'),
			value : 'flammable_solids-4.1',
		},
		{
			label : t('frt:commodity_option_standard_flammable_solids_self_heat_4_2'),
			value : 'flammable_solids_self_heat-4.2',
		},
		{
			label : t('frt:commodity_option_standard_imo_classes_5_1'),
			value : 'imo_classes-5.1',
		},
		{
			label : t('frt:commodity_option_standard_toxic_substances_6_1'),
			value : 'toxic_substances-6.1',
		},
		{
			label : t('frt:commodity_option_standard_infectious_substances_6_2'),
			value : 'infectious_substances-6.2',
		},
		{
			label : t('frt:commodity_option_standard_radioactive_material_7'),
			value : 'radioactive_material-7',
		},
		{
			label : t('frt:commodity_option_standard_corrosives_8'),
			value : 'corrosives-8',
		},
		{
			label : t('frt:commodity_option_standard_miscellaneous_dangerous_goods'),
			value : 'miscellaneous_dangerous_goods-9',
		},
	],

	refer: [
		{
			label : t('frt:commodity_option_refer_chilled'),
			value : 'chilled',
		},
		{
			label : t('frt:commodity_option_refer_frozen'),
			value : 'frozen',
		},
		{
			label : t('frt:commodity_option_refer_pharma'),
			value : 'pharma',
		},
	],
	open_top: [
		{
			label : t('frt:commodity_option_open_top_in_gauge_cargo'),
			value : 'in_gauge_cargo',
		},
	],
	flat_rack: [
		{
			label : t('frt:commodity_option_flat_rack_in_gauge_cargo'),
			value : 'in_gauge_cargo',
		},
	],
	iso_tank: [
		{
			label : t('frt:commodity_option_iso_tank_non_haz_solids'),
			value : 'non_haz_solids',
		},
		{
			label : t('frt:commodity_option_iso_tank_non_haz_gases'),
			value : 'non_haz_gases',
		},
		{
			label : t('frt:commodity_option_iso_tank_non_haz_liquids'),
			value : 'non_haz_liquids',
		},
		{
			label : t('frt:commodity_option_iso_tank_gases_2_1'),
			value : 'gases-2.1',
		},
		{
			label : t('frt:commodity_option_iso_tank_gases_2_2'),
			value : 'gases-2.2',
		},
		{
			label : t('frt:commodity_option_iso_tank_gases_2_3'),
			value : 'gases-2.3',
		},
		{
			label : t('frt:commodity_option_iso_tank_flammable_liquids_3'),
			value : 'flammable_liquids-3',
		},
		{
			label : t('frt:commodity_option_iso_tank_flammable_solids_4_1'),
			value : 'flammable_solids-4.1',
		},
		{
			label : t('frt:commodity_option_iso_tank_flammable_solids_self_heat_4_2'),
			value : 'flammable_solids_self_heat-4.2',
		},
		{
			label : t('frt:commodity_option_iso_tank_imo_classes_5_1'),
			value : 'imo_classes-5.1',
		},
		{
			label : t('frt:commodity_option_iso_tank_toxic_substances_6_1'),
			value : 'toxic_substances-6.1',
		},
		{
			label : t('frt:commodity_option_iso_tank_infectious_substances_6_2'),
			value : 'infectious_substances-6.2',
		},
		{
			label : t('frt:commodity_option_iso_tank_radioactive_material_7'),
			value : 'radioactive_material-7',
		},
		{
			label : t('frt:commodity_option_iso_tank_corrosives_8'),
			value : 'corrosives-8',
		},
		{
			label : t('frt:commodity_option_iso_tank_miscellaneous_dangerous_goods_9'),
			value : 'miscellaneous_dangerous_goods-9',
		},
	],
	open_side: [
		{
			label : t('frt:commodity_option_open_side_general'),
			value : 'general',
		},
	],
});

const getOptions = ({ containerType, t }) => {
	const COMMODITY_OPTIONS_MAPPING = getCommodityOptionMapping({ t });
	return COMMODITY_OPTIONS_MAPPING[containerType];
};

export default getOptions;
