import React from 'react';

import Layout from './Layout';
import styles from './styles.module.css';
import TableHeader from './TableHeader';

function ShipmentDetails({
	controls,
	control,
	errors,
	schedule,
	frequency,
	getValues = () => { },
	handleSubmit = () => { },
	contractServiceId,
	serviceType,
	freqCount,
	isEditPlan,
}) {
	return (

		<div className={styles.container}>
			<TableHeader serviceType={serviceType} />
			<Layout
				controls={controls}
				control={control}
				errors={errors}
				schedule={schedule}
				frequency={frequency}
				getValues={getValues}
				handleSubmit={handleSubmit}
				contractServiceId={contractServiceId}
				serviceType={serviceType}
				freqCount={freqCount}
				isEditPlan={isEditPlan}
			/>
		</div>
	);
}

export default ShipmentDetails;
