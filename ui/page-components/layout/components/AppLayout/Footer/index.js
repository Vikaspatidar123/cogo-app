import FooterItem from './FooterItem';
import styles from './styles.module.css';

import getSideBarConfigs from '@/packages/navigation-configs/side-bar';
import { useSelector } from '@/packages/store';

function AppLayoutFooter() {
	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const configs = getSideBarConfigs(user_data);
	const { nav_items = {} } = configs || {};
	const { organization = [] } = nav_items || {};
	const newMenuList = organization.slice(0, 4);
	return (
		<div className={styles.container}>
			{newMenuList.map((item) => (
				!item.isSubNavs
				&& (
					<FooterItem
						key={item.title}
						item={item}
					/>
				)
			))}

			<FooterItem item={{ title: 'More', href: '/v2/menu', as: '/v2/menu' }} />
		</div>
	);
}

export default AppLayoutFooter;
