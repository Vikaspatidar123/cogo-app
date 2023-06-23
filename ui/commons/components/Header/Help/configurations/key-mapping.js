export const actionButtonKeys = () => ({
	unresolved: {
		label : 'Resolve',
		name  : 'resolve',
	},
	closed: {
		label : 'Reopen',
		name  : 'reopen',
	},
	pending: {
		label : 'Resolve',
		name  : 'resolve',
	},
	escalated: {
		label : 'Resolve',
		name  : 'resolve',
	},
	reject_requested: {
		label : 'Resolve',
		name  : 'resolve',
	},
	resolve_requested: {
		label : 'Resolve',
		name  : 'resolve',
	},
});

export const tabsKeysMapping = () => [
	{
		name  : 'all',
		title : 'All',
	},
	{
		name  : 'open',
		title : 'Open',
	},
	{
		name  : 'solved',
		title : 'Solved',
	},
];

export const statusLabelTransformation = () => ({
	open: {
		label : 'Open',
		color : '#D6B300',
	},
	closed: {
		label : 'Solved',
		color : '#ABCD62',
	},
	rejected: {
		label : 'Rejected',
		color : '#F37166',
	},
});
