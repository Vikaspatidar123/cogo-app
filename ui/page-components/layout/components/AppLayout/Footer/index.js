import FooterItem from './FooterItem';
import styles from './styles.module.css';

import getValue from '@/commons/utils/getValue';
import getSideBarConfigs from '@/packages/navigation-configs/side-bar';

// import getNavigationList from '@/commons/utils/getNavigationList';
import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function AppLayoutFooter() {
	const {
		user_data,
	} = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { pathname } = useRouter();

	// const { account_types, verifications } = organization;
	const configs = getSideBarConfigs(user_data);
	const unPrefixedPath = `/${pathname.replace('/[org_id]/', '')}`;

	const { nav_items = {} } = configs || {};
	const { organization: menuList = [] } = nav_items;
	// const kycStatus = getValue(verifications, '[0].kyc_status');
	// const isKycVerified = kycStatus === 'verified';
	const newMenuList = menuList.slice(0, 4);
	// const menuList = getNavigationList({ isKycVerified, account_types });

	return (
		<div className={styles.container}>
			{newMenuList.map((item) => (
				<FooterItem
					key={item.label}
					item={item}
					isActive={unPrefixedPath === item.href}
				/>
			))}

			<FooterItem item={{ label: 'More', icon: 'more', href: '/menu' }} />
		</div>
	);
}

export default AppLayoutFooter;
