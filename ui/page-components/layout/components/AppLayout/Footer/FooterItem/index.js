import Dashboard from './dashboard.svg';
import Discover from './discover.svg';
import Finance from './finance.svg';
import More from './more.svg';
import Shimpents from './shipment.svg';
import styles from './styles.module.css';

import { Link } from '@/packages/next';

const ICON_MAPPING = {
	more: More,
	dashboard: Dashboard,
	shipments: Shimpents,
	finance: Finance,
	discover: Discover,
};

function AppLayoutFooterItem({ item, isActive }) {
	const Icon = ICON_MAPPING[item.icon] || Dashboard;

	let itemLabel = item.label;
	if (item.label === 'Discover Rates') {
		itemLabel = 'Discover';
	}
	console.log(item, 'item');
	return (
		<div>
			{/* <Link
				href={item.href}
				as={item.as}
				// className={isActive ? 'active' : ''}
				className={styles.container}
			> */}
			<Icon width="16px" height="16px" style={{ marginBottom: 4 }} />
			{itemLabel}
			{/* </Link> */}
		</div>
	);
}

export default AppLayoutFooterItem;
