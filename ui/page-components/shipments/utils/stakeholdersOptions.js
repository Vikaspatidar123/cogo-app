const StakeholderOptions = () => {
	const superadmin = [
		{ label: 'Booking Party', value: 'booking_party' },
		{ label: 'Shipper', value: 'shipper' },
		{ label: 'Consignee', value: 'consignee' },
		{ label: 'Collection Party', value: 'collection_party' },
		{ label: 'Origin Transporter', value: 'origin_transporter' },
		{ label: 'Destination Transporter', value: 'destination_transporter' },
		{ label: 'Origin CHA', value: 'origin_cha' },
		{ label: 'Destination CHA', value: 'destination_cha' },
	];

	const stakeholders = {
		origin_transporter: {
			label : 'Origin Transporter',
			value : 'origin_transporter',
		},
		destination_transporter: {
			label : 'Destination Transporter',
			value : 'destination_transporter',
		},
		origin_cha      : { label: 'Origin CHA', value: 'origin_cha' },
		destination_cha : { label: 'Destination CHA', value: 'destination_cha' },
	};

	return {
		superadmin,
		stakeholders,
	};
};

export default StakeholderOptions;
