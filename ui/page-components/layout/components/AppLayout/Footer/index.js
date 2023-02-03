import FooterItem from './FooterItem';
import styles from './styles.module.css';

import getSideBarConfigs from '@/packages/navigation-configs/side-bar';
import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function AppLayoutFooter() {
	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { pathname } = useRouter();
	const configs = getSideBarConfigs(user_data);
	const unPrefixedPath = `/${pathname.replace('/[org_id]/', '')}`;
	const { nav_items = {} } = configs || {};
	const { organization: menuList = [] } = nav_items;
	const newMenuList = menuList.slice(0, 4);
	return (
		<div className={styles.container}>
			{newMenuList.map((item) => (
				!item.isSubNavs
				&& (
					<FooterItem
						key={item.title}
						item={item}
						isActive={unPrefixedPath === item.href}
					/>
				)
			))}

			<FooterItem item={{ title: 'More', href: '/menu' }} />
		</div>
	);
}

export default AppLayoutFooter;
