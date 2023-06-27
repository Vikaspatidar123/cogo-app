const shipmentTableConfig = [
	{
		name           : 'associatedShipments',
		title          : 'Associated Shipments',
		maxHeight      : '15vh',
		emptyStateText : 'Add shipments to show here',
	},
	{
		name           : 'otherName',
		title          : 'Other Shipments',
		maxHeight      : '20vh',
		emptyStateText : 'No other shipments found',
	},
];

export const getTableFn = ({ associatedShipments, otherShipments }) => shipmentTableConfig.map((config) => ({
	...config,
	filteredList: config.name === 'associatedShipments' ? associatedShipments : otherShipments,
}));
