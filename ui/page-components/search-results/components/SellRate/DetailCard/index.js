import { startCase } from 'lodash';
import React from 'react';
import ShippingLineForm from './ShippingLineForm.js';
import { Container, Text } from './styles';

const DRIVER_TEXT_SHOW = [
	'ftl_freight',
	'ltl_freight',
	'haulage_freight',
	'fcl_customs',
	'lcl_customs',
	'air_customs',
];

const DetailCard = ({
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
}) => {
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
		<Container>
			{data?.search_type ? (
				<Text>Customize {startCase(data?.search_type)}</Text>
			) : null}
			{DRIVER_TEXT_SHOW.includes(data?.search_type) ? (
				<Text className="lead-text">
					Click the Go to Checkout button to be able to Customize Checkout!
				</Text>
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
		</Container>
	);
};

export default DetailCard;
