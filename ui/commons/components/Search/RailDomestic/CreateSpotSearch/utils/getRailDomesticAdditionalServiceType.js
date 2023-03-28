const mapping = {
	'true:true'   : 'D2D',
	'true:false'  : 'D2T',
	'false:true'  : 'T2D',
	'false:false' : 'T2T',
};

const getRailDomesticAdditionalServiceType = ({
	isDoorPickupRequired = false,
	isDoorstepDeliveryRequired = false,
}) => {
	const key = `${!!isDoorPickupRequired}:${!!isDoorstepDeliveryRequired}`;

	return mapping[key];
};

export default getRailDomesticAdditionalServiceType;
