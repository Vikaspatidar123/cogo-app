const handleScroll = () => {
	// if (history.pushState) {
	// 	history.pushState({}, '', '#shipment-tabs');
	// }
	document
		.getElementById('shipment-tabs')
		.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
};

export default handleScroll;
