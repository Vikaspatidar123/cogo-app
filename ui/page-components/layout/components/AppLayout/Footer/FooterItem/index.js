import More from './more.svg';
import styles from './styles.module.css';

import { useRouter, Link } from '@/packages/next';

function AppLayoutFooterItem({ item }) {
	const { pathname } = useRouter();
	const Icon = item.icon || More;
	const isActive = `/${pathname.replace('/[org_id]/[branch_id]/', '')}` === item.href;
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
