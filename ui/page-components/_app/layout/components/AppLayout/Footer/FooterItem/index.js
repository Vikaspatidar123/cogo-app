/* eslint-disable no-undef */
import { IcMListView } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function AppLayoutFooterItem({ item }) {
	const { pathname, push } = useRouter();
	const { href = '', as = '' } = item || {};

	const getRedirectUrl = () => {
		push(href, as);
	};
	const urlArray = item.href?.split('v2');
	const url = urlArray?.length > 1 ? urlArray[1] : urlArray?.[0];
	const isActive = `/${pathname.replace('/[org_id]/[branch_id]/', '')}` === url;
	return (
		<div
			onClick={() => getRedirectUrl()}
			key={item.href}
			className={styles.container}
			role="presentation"
		>
			<div className={isActive ? styles.active : ''}>
				{item.mobileIcon || <IcMListView width={20} height={20} />}
				<div>{item.title}</div>
			</div>
		</div>
	);
}

export default AppLayoutFooterItem;
