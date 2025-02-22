const getControls = ({ setLocation = () => {}, location = {} }) => [
	{
		name           : 'origin',
		label          : 'AIRPORT',
		defaultOptions : true,
		type           : 'async_select',
		placeholder    : 'Shipping from',
		asyncKey       : 'locations',

		handleChange: (obj) => {
			setLocation((pv) => ({
				...pv,
				origin: obj,
			}));
		},
		params: {
			filters: { type: ['airport', 'city', 'country'] },
		},
		grouped : ['city', 'country'],
		value   : location?.origin?.id,
		span    : 12,
		rules   : {
			required: 'true',
		},
	},
];

export default getControls;
