import ToolTip from '@cogoport/components';

import NavBarItem from './NavBarItem';
import styles from './styles.module.css';
import SubMenu from './SubMenu';

import getNavigationList from '@/commons/utils/getNavigationList';
import getValue from '@/commons/utils/getValue';
import { useSelector } from '@/packages/store';

function NavBar() {
	const {
		unPrefixedPath,
		partner: { account_types, verifications },
	} = useSelector(({ general, profile }) => ({
		unPrefixedPath : general.unPrefixedPath,
		partner        : profile.partner || {},
	}));

	const kycStatus = getValue(verifications, '[0].kyc_status');

	const menuList = getNavigationList({
		isKycVerified: kycStatus === 'verified',
		account_types,
	});

	return (
		<div className={styles.menu}>
			{menuList.map((item) => {
				const { type } = item;

				if (type === 'link') {
					return <NavBarItem key={item.label} item={item} />;
				}

				const isActive = item.options.find((option) => option.href === unPrefixedPath)
					? 'active'
					: '';

				return (
					<div className={styles.tooltip_container} key={item.label}>
						<ToolTip
							content={<SubMenu options={item.options} />}
							theme="light-border"
							animation="shift-away"
							interactive
							maxWidth={646}
						>
							<div className={`no-hover ${styles.text} ${isActive ? 'active' : ''}`}>
								{item.label}
							</div>
						</ToolTip>
					</div>
				);
			})}
		</div>
	);
}

export default NavBar;
