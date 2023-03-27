const CUSTOM_THEME = (isMobile) => ({
	control: {
		minHeight   : '30px',
		maxHeight   : '30px',
		fontWeight  : 'bold',
		fontSize    : '12px',
		lineHeight  : '14px',
		borderColor : '#E0E0E0',
		background  : 'white',
		width       : isMobile ? '236px' : '300px',
		':disabled' : { cursor: 'not-allowed', opacity: '0.6' },
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
});

export default CUSTOM_THEME;
