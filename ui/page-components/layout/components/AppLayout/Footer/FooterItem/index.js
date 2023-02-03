import Dashboard from './dashboard.svg';
import Discover from './discover.svg';
import Finance from './finance.svg';
import More from './more.svg';
import Shimpents from './shipment.svg';
import styles from './styles.module.css';

import { useRouter, Link } from '@/packages/next';

const ICON_MAPPING = {
	more: More,
	dashboard: Dashboard,
	shipments: Shimpents,
	finance: Finance,
	discover: Discover,
};

function AppLayoutFooterItem({ item }) {
	// const Icon = ICON_MAPPING[item.icon] || Dashboard;
	const { pathname } = useRouter();
	const Icon = item.icon || More;
	const isActive = `/${pathname.replace('/[org_id]/', '')}` === item.href;
	return (

		<Link
			href={item.href}
			as={item.as}
			key={item.href}
			className={styles.container}
		>
			<div className={isActive && styles.active}>
				<Icon width="16px" height="16px" style={{ marginBottom: 4 }} key={item.href} />
				{item.title}
			</div>
		</Link>

	);
}

export default AppLayoutFooterItem;
