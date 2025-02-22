const generalGoods = [
	{
		label : 'All Commodities',
		value : 'all',
	},
];

const specialGoods = [
	{
		label : 'Gases 2.1',
		value : 'gases-2.1',
	},
	{
		label : 'Gases 2.2',
		value : 'gases-2.2',
	},
	{
		label : 'Gases 2.3',
		value : 'gases-2.3',
	},
	{
		label : 'Flammable Liquids 3',
		value : 'flammable_liquids-3',
	},
	{
		label : 'Flammable Solids 4.1',
		value : 'flammable_solids-4.1',
	},
	{
		label : 'Flammable Solids Self Heat 4.2',
		value : 'flammable_solids_self_heat-4.2',
	},
	{
		label : 'IMO Classes 5.1',
		value : 'imo_classes-5.1',
	},
	{
		label : 'Toxic Substances 6.1',
		value : 'toxic_substances-6.1',
	},
	{
		label : 'Infectious Substances 6.2',
		value : 'infectious_substances-6.2',
	},
	{
		label : 'Radioactive Material 7',
		value : 'radioactive_material-7',
	},
	{
		label : 'Corrosives 8',
		value : 'corrosives-8',
	},
	{
		label : 'Miscellaneous Dangerous Goods 9',
		value : 'miscellaneous_dangerous_goods-9',
	},
];

const getControls = (cargoType) => [
	{
		name        : 'commodity',
		type        : 'select',
		label       : 'Commodity',
		placeholder : 'Select general cargo type',
		style       : { width: '320px' },
		options     : cargoType === 'general_cargo' ? generalGoods : specialGoods,
		rules       : { required: true },
	},
];

export default getControls;
