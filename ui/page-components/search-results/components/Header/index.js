import React from 'react';

import Sort from './Sort';

function Header({
	search_type = '',
	setSort = () => {},
	sortBy = '',
}) {
	return (
		<div>
			<Sort search_type={search_type} setSort={setSort} sortBy={sortBy} />
		</div>

	);
}

export default Header;
