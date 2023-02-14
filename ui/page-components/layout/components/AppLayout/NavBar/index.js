import { Tooltip } from '@cogoport/components';

import NavBarItem from './NavBarItem';
import styles from './styles.module.css';
import SubMenu from './SubMenu';

import getSideBarConfigs from '@/packages/navigation-configs/side-bar';
import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function NavBar() {
	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { pathname } = useRouter();

	const unPrefixedPath = `/${pathname.replace('/[org_id]/[branch_id]/', '')}`;

	const configs = getSideBarConfigs(user_data);
	const { nav_items = {} } = configs || {};
	const { organization = [] } = nav_items || {};
	const getFindUrl = (item) => {
		const urlArray = item?.split('v2');
		const url = urlArray?.length > 1 ? urlArray[1] : urlArray?.[0];
		return url;
	};
	return (
		<div className={styles.menu}>
			{organization.map((item) => {
				const { type } = item;
				if (type === 'link') {
					return <NavBarItem key={item.title} item={item} unPrefixedPath={unPrefixedPath} getFindUrl={getFindUrl} />;
				}

				const isActive = !!item.options.find((option) => getFindUrl(option.href) === unPrefixedPath);
				return (
					<div key={item.title}>
						<Tooltip
							content={<SubMenu options={item.options} unPrefixedPath={unPrefixedPath} getFindUrl={getFindUrl} />}
							// theme="light-border"
							// animation="shift-away"
							placement="bottom"
							interactive
							maxWidth={646}
							className={styles.tippy_box}
						>
							<div className={`${isActive ? styles.active : styles.text}`}>
								{item.title}
							</div>
						</Tooltip>
					</div>
				);
			})}
		</div>
	);
}

export default NavBar;
