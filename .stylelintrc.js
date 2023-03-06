module.exports = {
	extends : ['@cogoport/stylelint-config'],
	rules   : {
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['global'],
			},
		],
		'selector-class-pattern' : [false],
		// 'keyframes-name-pattern' : [false],
		'keyframes-name-pattern' : '^((key-frame)|([a-z][a-z0-9]*)(-[a-z0-9]+)*)$',
	},
};
