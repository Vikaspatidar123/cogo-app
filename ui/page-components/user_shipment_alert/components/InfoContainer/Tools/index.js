import { getCookie } from '@cogoport/utils';

import BookShipment from './BookShipment';
import ShipmentTracking from './ShipmentTracking';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const MAPPING = {
	true  : BookShipment,
	false : ShipmentTracking,
};

function Tools() {
	const local = 'IN' || getCookie('location');

	const Components = MAPPING[!GLOBAL_CONSTANTS.cogo_entity_country.includes(local)];

	return (
		<div>
			{Components ? <Components /> : null}
		</div>
	);
}
export default Tools;
