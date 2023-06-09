const CUSTOM_THEME = (className) => ({
	control: {
		height          : className === 'small' ? 40 : 44,
		border          : 'solid 1px #E0E0E0',
		cursor          : 'text',
		boxShadow       : 'none',
		':focus'        : { border: '1px solid #black', boxShadow: 'none' },
		':focus-within' : { border: '1px solid #black', boxShadow: 'none' },
		':hover'        : { border: '1px solid #black', boxShadow: 'none' },
	},
	valueContainer: {
		fontSize     : '14px',
		color        : '#000000',
		lineHeight   : '16px',
		fontWeight   : 'bold',
		textOverflow : 'ellipsis',
		whiteSpace   : 'nowrap',
		overflow     : 'hidden',
	},
	placeholder: {
		fontWeight : 'normal',
		fontSize   : '14px',
		lineHeight : '160%',
		color      : '#828282',
	},
});

export default CUSTOM_THEME;
