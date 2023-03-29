import { useState } from 'react';

import useCreateEmptyCheckout from '../../hooks/useCreateEmptyCheckout';

import DetailCard from './DetailCard';
import styles from './styles.module.css';

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
		<div className={styles.container}>
			<div className={styles.header}>
				<div>Configure Sell Rate</div>
			</div>
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
		</div>
	);
}

export default SellRate;
