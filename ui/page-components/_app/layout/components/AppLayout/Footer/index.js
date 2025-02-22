import { useTranslation } from 'next-i18next';

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
	const { t } = useTranslation(['common']);

	const configs = getSideBarConfigs({ userData: user_data, t });
	const { nav_items = {} } = configs || {};
	const { organization = [] } = nav_items || {};
	const newMenuList = organization.slice(0, 5);
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

			<FooterItem item={{ title: 'More', href: '/menu', as: '/menu' }} />
		</div>
	);
}

export default AppLayoutFooter;
