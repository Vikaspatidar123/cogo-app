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
		'keyframes-name-pattern' : [false],
	},
};
