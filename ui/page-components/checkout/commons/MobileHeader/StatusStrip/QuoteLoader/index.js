import { Placeholder } from '@cogoport/components';
import React from 'react';

export function TotalCostLoader() {
	return (
		<div>
			<div
				style={{
					display        : 'flex',
					alignItems     : 'center',
					justifyContent : 'space-between',
				}}
			>
				<Placeholder width="150px" margin="10px" />
				<Placeholder width="150px" margin="10px" />
			</div>
			<div
				style={{
					display        : 'flex',
					alignItems     : 'center',
					justifyContent : 'space-between',
				}}
			>
				<Placeholder width="150px" margin="10px" />
				<Placeholder width="150px" margin="10px" />
			</div>
			<div
				style={{
					display        : 'flex',
					alignItems     : 'center',
					justifyContent : 'space-between',
				}}
			>
				<Placeholder width="170px" margin="10px" height="40px" />
				<Placeholder width="170px" margin="10px" height="40px" />
			</div>
		</div>
	);
}
