/* eslint-disable max-len */
import { Popover } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import NavBarItem from './NavBarItem';
import styles from './styles.module.css';
import SubMenu from './SubMenu';

import getSideBarConfigs from '@/packages/navigation-configs/side-bar';
import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function NavBar() {
	const { t } = useTranslation(['common']);

	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { pathname } = useRouter();

	const unPrefixedPath = `/${pathname.replace('/[org_id]/[branch_id]/', '')}`;

	const configs = getSideBarConfigs({ userData: user_data, t });
	const { nav_items = {} } = configs || {};
	const { organization = [] } = nav_items || {};

	return (
		<div className={styles.menu}>
			{organization.map((item) => {
				const { showInNav = false, isSubNavs = false } = item;
				const isActive = !!item.options?.find(
					(option) => option.href === unPrefixedPath,
				);

				if (showInNav) {
					return !isSubNavs ? (
						<NavBarItem
							key={item.title}
							item={item}
							unPrefixedPath={unPrefixedPath}
						/>
					) : (
						<div key={item.title}>
							<Popover
								render={(
									<SubMenu
										options={item.options}
										unPrefixedPath={unPrefixedPath}
									/>
								)}
								placement="bottom"
								className={styles.tippy_box}
								trigger="mouseenter click"
							>
								<div className={`${isActive ? styles.active : styles.text}`}>
									{item.title}
								</div>
							</Popover>
						</div>
					);
				}
				return null;
			})}
		</div>
	);
}

export default NavBar;
