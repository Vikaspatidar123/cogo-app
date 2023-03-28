import { useState } from 'react';

import useCreateEmptyCheckout from '../../hooks/useCreateEmptyCheckout';

import DetailCard from './DetailCard';
import { Container, Header } from './styles';

function SellRate({
	rates = [],
	wayToBook,
	data = {},
	searchData = {},
	setAddRate = () => {},
	setWayToBook = () => {},
}) {
	const { touch_points } = searchData || {};

	const [spotBookingDetails, showSpotBookingDetails] = useState({
		checkout_id : '',
		showForm    : false,
	});

	const { handleSave, loading } = useCreateEmptyCheckout({
		data,
		setAddRate,
		touch_points,
		wayToBook,
		showSpotBookingDetails,
	});

	return (
		<Container>
			<Header>
				<div>Configure Sell Rate</div>
			</Header>
			<DetailCard
				setAddRate={setAddRate}
				rates={rates}
				handleSave={handleSave}
				setWayToBook={setWayToBook}
				data={data}
				loading={loading}
				wayToBook={wayToBook}
				spotBookingDetails={spotBookingDetails}
				showSpotBookingDetails={showSpotBookingDetails}
			/>
		</Container>
	);
}

export default SellRate;
