import Categories from '../DetailsTabs/AlertsPreferences/Categories';
import ShipmentAlerts from '../DetailsTabs/AlertsPreferences/ShipmentAlerts';

const getOptions = ({ t = () => { } }) => (
	{
		// shipment_alerts: {
		// 	key                : 'shipment_alerts',
		// 	title              : t('settings:shipment_alerts_text'),
		// 	containerComponent : ShipmentAlerts,

		// },
		promotional_alerts: {
			key                : 'promotional_alerts',
			title              : t('settings:promotional_alerts_text'),
			containerComponent : Categories,

		},
	});

export default getOptions;
