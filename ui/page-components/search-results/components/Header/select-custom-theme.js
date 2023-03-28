const CUSTOM_THEME = (type) => {
	let style = {};

	if (type === 'sort') {
		style = {
			borderColor : '#67c676',
			background  : '#e6fbe9',
			width       : '112px',
		};
	} else if (type === 'currency') {
		style = {
			borderColor : '#E0E0E0',
			background  : 'white',
			width       : '84px',
		};
	}

	return {
		control: {
			minHeight  : '30px',
			maxHeight  : '30px',
			fontWeight : 'bold',
			fontSize   : '12px',
			lineHeight : '14px',
			...style,
		},
		indicatorsContainer: {
			'.select__dropdown-indicator': {
				padding : '6px 8px 7px',
				svg     : {
					width  : '16px',
					height : '16px',
					color  : 'black',
				},
			},
		},
	};
};

export default CUSTOM_THEME;
