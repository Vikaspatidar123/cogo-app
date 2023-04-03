import { startCase } from '@cogoport/utils';
import React from 'react';

import ShippingLineForm from './ShippingLineForm.js';
import styles from './styles.module.css';

const DRIVER_TEXT_SHOW = [
	'ftl_freight',
	'ltl_freight',
	'haulage_freight',
	'fcl_customs',
	'lcl_customs',
	'air_customs',
];

function DetailCard({
	rates = [],
	data,
	handleSave = () => {},
	setDateCondition = () => {},
	setWayToBook = () => {},
	setAddRate = () => {},
	loading,
	wayToBook,
	spotBookingDetails,
	showSpotBookingDetails = () => {},
}) {
	const { service_details = {} } = data || {};

	const check_multiple_containers_fcl = Object.values(
		service_details || {},
	).filter((service) => {
		if (service?.service_type === 'fcl_freight') {
			return service;
		}

		return null;
	});

	return (
		<div className={styles.container}>
			{data?.search_type ? (
				<div className={styles.text}>
					Customize
					{startCase(data?.search_type)}
				</div>
			) : null}
			{DRIVER_TEXT_SHOW.includes(data?.search_type) ? (
				<div className={`${styles.text} ${styles.lead_text}`}>
					Click the Go to Checkout button to be able to Customize Checkout!
				</div>
			) : null}

			<ShippingLineForm
				rates={rates}
				handleSave={handleSave}
				setDateCondition={setDateCondition}
				setAddRate={setAddRate}
				setWayToBook={setWayToBook}
				data={data}
				loading={loading}
				wayToBook={wayToBook}
				spotBookingDetails={spotBookingDetails}
				check_multiple_containers_fcl={check_multiple_containers_fcl}
				showSpotBookingDetails={showSpotBookingDetails}
			/>
		</div>
	);
}

export default DetailCard;
