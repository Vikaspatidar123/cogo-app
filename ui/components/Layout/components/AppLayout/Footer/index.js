import FooterItem from './FooterItem';
import styles from './styles.module.css';

import getNavigationList from '@/commons/utils/getNavigationList';
import getValue from '@/commons/utils/getValue';
import { useSelector } from '@/packages/store';

function AppLayoutFooter() {
	const {
		general: { unPrefixedPath },
		profile: { partner },
	} = useSelector((reduxState) => reduxState);
	const { account_types, verifications } = partner;

	const kycStatus = getValue(verifications, '[0].kyc_status');
	const isKycVerified = kycStatus === 'verified';

	const menuList = getNavigationList({ isKycVerified, account_types });
	const newMenuList = menuList.slice(0, 4);

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
