const LAYOUT = {
	0: {
		controlNames: {
			quantity: {
				name : 'quantity',
				span : 12,
			},
		},
		span: 1,
	},
	1: {
		controlNames: {
			length: {
				name  : 'length',
				span  : 2.76,
				style : { paddingRight: 0 },
			},
			width: {
				name  : 'width',
				span  : 2.76,
				style : { padding: 0 },
			},
			height: {
				name  : 'height',
				span  : 2.76,
				style : { padding: 0 },
			},
			dimensions_unit: {
				name  : 'dimensions_unit',
				span  : 3.6,
				style : { paddingLeft: 0 },
			},
		},
		span: 4,
	},
	2: {
		controlNames: {
			weight: {
				name  : 'weight',
				span  : 5.5,
				style : { paddingRight: 0 },
			},
			weight_unit: {
				name  : 'weight_unit',
				span  : 6.5,
				style : { paddingLeft: 0 },
			},
		},
		span: 2.3,
	},
	3: {
		controlNames: {
			packing_type: {
				name : 'packing_type',
				span : 12,
			},
		},
		span: 1.32,
	},
	4: {
		controlNames: {
			handling_type: {
				name  : 'handling_type',
				span  : '12',
				style : { marginTop: 6 },
			},
		},
		span: 1.38,
	},
	5: {
		controlNames: {
			displayDetails: {
				name : 'details',
				span : 12,
			},
		},
		span: 1.5,
	},
	6: {
		controlNames: {
			deleteButton: {
				name : 'deleteButton',
				span : 12,
			},
		},
		span: 0.5,
	},
};

export default LAYOUT;
