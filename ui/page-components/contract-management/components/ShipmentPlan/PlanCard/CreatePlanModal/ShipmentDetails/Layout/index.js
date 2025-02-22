import React from 'react';

import ChildFormat from './ChildFormat';

function Layout({
	control,
	controls,
	errors,
	schedule,
	frequency,
	getValues = () => { },
	handleSubmit = () => { },
	contractServiceId,
	serviceType,
	freqCount,
	isEditPlan,
	vesselOptionsLength,
}) {
	return (
		<div>
			{(controls || []).map((controlItem) => (
				<ChildFormat
					{...controlItem}
					schedule={schedule}
					control={control}
					error={errors[controlItem.name]}
					frequency={frequency}
					getValues={getValues}
					handleSubmit={handleSubmit}
					contractServiceId={contractServiceId}
					serviceType={serviceType}
					freqCount={freqCount}
					isEditPlan={isEditPlan}
					vesselOptionsLength={vesselOptionsLength}
				/>
			))}
		</div>
	);
}

export default Layout;
