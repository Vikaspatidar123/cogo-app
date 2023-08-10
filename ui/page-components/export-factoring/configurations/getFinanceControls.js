const date = new Date();
const currentYear = date.getFullYear();
const currentAssessmentYear =		date.getMonth() > 3 ? currentYear : currentYear - 1;

const yearOptions = [currentAssessmentYear, currentAssessmentYear - 1].map(
	(year) => ({
		label : `${year} - ${year + 1}`,
		value : `${year} - ${year + 1}`,
	}),
);

export const financialReportControls = () => [
	{
		name               : 'financial_data',
		label              : '',
		heading            : '',
		type               : 'fieldArray',
		value              : [{}],
		noDeleteButtonTill : 1,
		controls           : [
			{
				name       : 'select_year',
				label      : 'Select Assessment Year',
				type       : 'select',
				span       : 3,
				placholder : 'Select Assessment Year',
				rules      : { required: 'Required' },
				options    : yearOptions,
			},
			{
				name       : 'financial_report',
				type       : 'file',
				label      : 'Upload Financial Report',
				drag       : true,
				span       : 4,
				uploadType : 'aws',
				accept     : '.pdf',
				height     : 72,
				rules      : { required: 'Required' },
			},
			{
				name       : 'itr',
				type       : 'file',
				drag       : true,
				label      : 'ITR Report',
				span       : 4,
				uploadType : 'aws',
				accept     : '.pdf',
				height     : 72,
				rules      : { required: 'Required' },

			},
		],
	},
];
