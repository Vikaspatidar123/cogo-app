const OPTIONS = [
	{
		label   : 'Class 1—Explosives',
		options : [
			{
				label : 'Class 1.1',
				value : 'Class 1.1',
			},
			{
				label : 'Class 1.2',
				value : 'Class 1.2',
			},
			{
				label : 'Class 1.3 (C or G)',
				value : 'Class 1.3',
			},
			{
				label : 'Class 1.3 (F or H or J or K or L)',
				value : 'Class 1.3 (F or H or J or K or L)',
			},
			{
				label : 'Class 1.4 (B or C or D or E or G)',
				value : 'Class 1.4',
			},
			{
				label : 'Class 1.4 (S)',
				value : 'Class 1.4 (S)',
			},
			{
				label : 'Class 1.4 (F)',
				value : 'Class 1.4 (F)',
			},
			{
				label : 'Class 1.5',
				value : 'Class 1.5',
			},
			{
				label : 'Class 1.6',
				value : 'Class 1.6',
			},
		],
	},
	{
		label   : 'Class 2—Gases',
		options : [
			{
				label : 'Class 2.1 (Flammable Gases)',
				value : 'Class 2.1',
			},
			{
				label : 'Class 2.2 (Non-Flammable, Non-Toxic Gases)',
				value : 'Class 2.2',
			},
			{
				label : 'Class 2.3 (Toxic Gases)',
				value : 'Class 2.3',
			},
		],
	},
	{
		label   : 'Class 3—Flammable Liquids',
		options : [
			{
				label : 'Class 3',
				value : 'Class 3',
			},
		],
	},
	{
		label   : 'Class 4—Flammable Solids',
		options : [
			{
				label : 'Class 4.1 (Flammable Solid)',
				value : 'Class 4.1',
			},
			{
				label : 'Class 4.2 (Spontaneously Combustible)',
				value : 'Class 4.2',
			},
			{
				label : 'Class 4.3 (Dangerous When Wet)',
				value : 'Class 4.3',
			},
		],
	},
	{
		label   : 'Class 5—Oxidizing Substances and Organic Peroxides',
		options : [
			{
				label : 'Class 5.1 (Oxidizing Substances)',
				value : 'Class 5.1',
			},
			{
				label : 'Class 5.2 (Organic Peroxide)',
				value : 'Class 5.2',
			},
		],
	},
	{
		label   : 'Class 6—Toxic and Infectious Substances',
		options : [
			{
				label : 'Class 6.1 (Toxic Liquids/Solids)',
				value : 'Class 6.1',
			},
			{
				label : 'Class 6.2 (Biological Substances)',
				value : 'Class 6.2',
			},
		],
	},
	{
		label   : 'Class 7—Radioactive Material',
		options : [
			{
				label : 'Class 7',
				value : 'Class 7',
			},
		],
	},
	{
		label   : 'Class 8—Corrosives Liquids/Solids',
		options : [
			{
				label : 'Class 8',
				value : 'Class 8',
			},
		],
	},
	{
		label:
			'Class 9—Miscellaneous Dangerous Substances and Articles, Including Environmentally Hazardous Substances',
		options: [
			{
				label : 'Class 9',
				value : 'Class 9',
			},
		],
	},
];

const TEMP_CONTROLLED_RANGE_OPTIONS = [
	{
		label   : 'active',
		options : [
			{
				label : 'Active General Pharma',
				value : 'active-general_pharma',
			},
			{
				label : 'Active Chilled: 2-8 degree Celsius',
				value : 'active-chilled',
			},
			{
				label : 'Active Ambient: 15-25 degree Celsius',
				value : 'active-ambient',
			},
			{
				label : 'Active Frozen: 0 to -20 degree Celsius',
				value : 'active-frozen',
			},
		],
	},
	{
		label   : 'passive',
		options : [
			{
				label : 'Passive General Pharma',
				value : 'passive-general_pharma',
			},
			{
				label : 'Passive Chilled: 2-8 degree Celsius',
				value : 'passive-chilled',
			},
			{
				label : 'Passive Ambient: 15-25 degree Celsius',
				value : 'passive-ambient',
			},
			{
				label : 'Passive Frozen: 0 to -20 degree Celsius',
				value : 'passive-frozen',
			},
		],
	},
];

const OTHER_SPECIAL_OPTIONS = [
	{
		label : 'Perishable',
		value : 'perishable',
	},
	{
		label : 'Valuables',
		value : 'valuables',
	},
	{
		label : 'Fragile',
		value : 'fragile',
	},
	{
		label : 'Others',
		value : 'others',
	},
];

const OTHER_SPECIAL_DOMESTIC_OPTIONS = [
	{
		label : 'Autoparts (AUP)',
		value : 'autoparts',
	},
	{
		label : 'Perishable Fruits (PER)',
		value : 'perishable_fruits',
	},
	{
		label : 'Perishable Vegetables (PER)',
		value : 'perishable_vegetables',
	},
	{
		label : 'Fish Seeds (FSD)',
		value : 'fish_seeds',
	},
	{
		label : 'Shrimps (FSD)',
		value : 'shrimps',
	},
	{
		label : 'Perishable Seafood (PES)',
		value : 'perishable_seafood',
	},
	{
		label : 'Perishables Fresh Fish (PES)',
		value : 'perishables_fresh_fish',
	},
	{
		label : 'Mobile & Accessories (VUP)',
		value : 'mobile_and_accessories',
	},
	{
		label : 'Meat (PEM)',
		value : 'meat',
	},
	{
		label : 'Betel Leaves (PAN)',
		value : 'betel_leaves',
	},
	{
		label : 'Betel Nuts (PAN)',
		value : 'betel_nuts',
	},
	{
		label : 'Prime',
		value : 'prime',
	},
	{
		label : 'Meat',
		value : 'meat',
	},
	{
		label : 'Courier',
		value : 'courier',
	},
	{
		label : 'Human Remains',
		value : 'human_remains',
	},
	{
		label : 'Unaccompanied Baggage',
		value : 'unaccompanied_baggage',
	},
	{
		label : 'Personal Effects',
		value : 'personal_effects',
	},
	{
		label : 'Perishable',
		value : 'perishable',
	},
	{
		label : 'Valuables',
		value : 'valuables',
	},
	{
		label : 'Fragile',
		value : 'fragile',
	},
	{
		label : 'Others',
		value : 'others',
	},
];

const COMMODITY_TYPE_MAPPING = {
	international_freight: {
		general: [
			{
				label : 'All',
				value : 'all',
			},
		],
		dangerous       : OPTIONS,
		temp_controlled : TEMP_CONTROLLED_RANGE_OPTIONS,
		other_special   : OTHER_SPECIAL_OPTIONS,
	},
	domestic_transport: {
		general: [
			{
				label : 'Auto',
				value : 'auto',
			},
			{
				label : 'Machinery',
				value : 'machinery',
			},
			{
				label : 'Coriander Leaves',
				value : 'coriander_leaves',
			},
			{
				label : 'Others',
				value : 'others',
			},
		],
		dangerous       : OPTIONS,
		temp_controlled : TEMP_CONTROLLED_RANGE_OPTIONS,
		other_special   : OTHER_SPECIAL_DOMESTIC_OPTIONS,
	},
};

export default COMMODITY_TYPE_MAPPING;
