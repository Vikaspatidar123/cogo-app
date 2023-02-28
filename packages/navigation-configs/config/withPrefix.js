const withPrefix = (routes) => Object.keys(routes).reduce(
	(prev, current) => ({
		...prev,
		[`/[org_id]/[branch_id]${current}`]: routes[current],
	}),
	{},
);

module.exports = withPrefix;
