const statusFilter = [
	{
		suffix : 'All',
		key    : 'all',
	},
	{
		suffix : 'Active',
		key    : 'live',
	},
	{
		suffix : 'Requested',
		key    : 'requested',
	},
	{
		suffix : 'Drafts',
		key    : 'draft',
	},
	{
		suffix : 'Expired',
		key    : 'is_expired',
	},
];

export const getStatusFilters = ({ stats = {} }) => statusFilter.map((status) => ({
	...status,
	suffix:
	<div>
		{status.suffix}
		{' '}
		(
		{stats?.[status.key] || 0}
		)
	</div>,
}));
