const listConfig = {
	fields: [
		{
			key   : 'cogoPolicyNo',
			label : 'Policy ID',
			span  : 1.7,
			func  : 'renderPolicy',
		},
		{
			key   : 'coverage',
			label : 'Coverage',
			span  : 2.9,
			func  : 'renderPort',
		},
		{
			key     : 'subCommodity',
			label   : 'Commodity',
			span    : 2.1,
			toolTip : true,
		},
		{
			key        : 'transitDate',
			label      : 'Transit Start Date',
			span       : 1.6,
			sortingKey : 'TRANSIT_START_DATE',
			sorting    : true,
			func       : 'renderFormat',
		},
		{
			key        : 'createdAt',
			label      : 'Created At',
			span       : 1.3,
			sortingKey : 'CREATED_AT',
			sorting    : true,
			func       : 'renderFormat2',
		},
		{
			key   : 'status',
			label : 'Status',
			span  : 1.6,
			func  : 'renderStatus',
		},
		{
			key   : '',
			label : '',
			width : '10%',
			span  : 0.5,
			func  : 'renderIcon',
		},
	],
};

export default listConfig;
