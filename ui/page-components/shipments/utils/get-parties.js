const possibleParties = [
	{
		name : 'Exporter',
		type : 'object',
		key  : 'exporter_details',
	},
	{
		name : 'Shipper',
		type : 'object',
		key  : 'shipper_details',
	},
	{
		name : 'Consignee',
		type : 'object',
		key  : 'consignee_details',
	},
	{
		name : 'Importer',
		type : 'object',
		key  : 'importer_details',
	},
	{
		name : 'Origin Agent',
		type : 'object',
		key  : 'origin_agent_details',
	},
	{
		name : 'Other notifying parties',
		type : 'array',
		key  : 'notify_parties_details',
	},
	{
		name : 'Destination Agent',
		type : 'object',
		key  : 'destination_agent_details',
	},
];
const getIdAdded = (item, shipment_data) => {
	if (item?.type === 'array') {
		if (shipment_data[item?.key]?.length) {
			return true;
		} return false;
	}
	return !!shipment_data[item?.key];
};

const getPossibleParties = (shipment_data = {}) => possibleParties.map((item) => ({ ...item, isAdded: getIdAdded(item, shipment_data), data: shipment_data[item?.key] }));
export default getPossibleParties;
