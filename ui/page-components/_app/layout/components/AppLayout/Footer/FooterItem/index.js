/* eslint-disable jsx-a11y/no-static-element-interactions */
import More from './more.svg';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function AppLayoutFooterItem({ item }) {
	const { pathname, push } = useRouter();
	const { profile } = useSelector((s) => s);
	const { organization, branch } = profile || {};
	const Icon = item.icon || More;
	const { href = '', as = '' } = item || {};

	const getRedirectUrl = () => {
		if (href?.includes('/v2')) {
			const newHref = href?.replace('/v2', '');
			const newAs = as?.replace('/v2', '');
			push(newHref, newAs);
		} else {
			window.location.href = `/app/${organization?.id}/${branch?.id}/importer-exporter/${href}`;
		}
	};
	const urlArray = item.href?.split('v2');
	const url = urlArray?.length > 1 ? urlArray[1] : urlArray?.[0];
	const isActive = `/${pathname.replace('/[org_id]/[branch_id]/', '')}` === url;
	return (

		<div
			onClick={() => getRedirectUrl()}
			key={item.href}
			className={styles.container}
		>
			<div className={isActive && styles.active}>
				<Icon width="16px" height="16px" style={{ marginBottom: 4 }} key={href} />
				<div>{item.title}</div>
			</div>
		</div>

	);
}

export default AppLayoutFooterItem;
