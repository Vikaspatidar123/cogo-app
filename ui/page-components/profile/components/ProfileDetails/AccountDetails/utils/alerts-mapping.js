import Categories from '../DetailsTabs/AlertsPreferences/Categories';
import ShipmentAlerts from '../DetailsTabs/AlertsPreferences/ShipmentAlerts';

const getOptions = ({ t = () => { } }) => (
	{
		shipment_alerts: {
			key                : 'shipment_alerts',
			title              : 'Shipment Status Report Preferences',
			containerComponent : ShipmentAlerts,

		},
		tracking_alerts: {
			key                : 'tracking_alerts',
			title              : 'Tracking Alerts',
			containerComponent : Categories,
		},
		promotional_alerts: {
			key                : 'promotional_alerts',
			title              : 'Promotional Alerts',
			containerComponent : Categories,

		},
	});

export default getOptions;
