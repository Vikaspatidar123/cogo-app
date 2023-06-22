import React from 'react';

import LoaderCard from './LoaderCard';

function Loader() {
	return (
		<div>
			{[...Array(3)].map(() => (
				<LoaderCard />
			))}
		</div>
	);
}

export default Loader;
