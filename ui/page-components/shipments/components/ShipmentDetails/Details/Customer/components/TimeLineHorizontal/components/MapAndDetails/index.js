import { cl } from '@cogoport/components';

import PendingTasks from '../../../PendingTasks';
import QuickActions from '../../../QuickActions';
import ServicDetails from '../../../ServiceDetails';
import BreadCrumbs from '../Breadcrumbs';

import styles from './styles.module.css';

function MapAndDetails({
	setQuickAction,
	servicesForMap = false,
}) {
	return (
		<div className={cl`${styles.left_panel} ${servicesForMap ? styles.show_tracking : ''}`}>
			<BreadCrumbs servicesForMap={servicesForMap} />

			<ServicDetails servicesForMap={servicesForMap} />

			<div className={cl`${styles.panels} ${styles.actions}`}>
				<PendingTasks />

				<QuickActions
					setQuickAction={setQuickAction}
					servicesForMap={servicesForMap}
				/>
			</div>
		</div>
	);
}

export default MapAndDetails;
