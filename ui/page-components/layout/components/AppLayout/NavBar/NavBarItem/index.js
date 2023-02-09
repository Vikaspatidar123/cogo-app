/* eslint-disable jsx-a11y/aria-role */
import styles from '../styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function NavBarItem({ item, unPrefixedPath }) {
	const urlArray = item.href?.split('v2');
	const url = urlArray?.length > 1 ? urlArray[1] : urlArray?.[0];
	const { push } = useRouter();
	const { profile } = useSelector((s) => s);
	const { organization, branch } = profile || {};
	const getRedirectUrl = () => {
		if (url?.includes('/v2')) {
			const newHref = url?.replace('/v2', '');
			const newAs = url?.replace('/v2', '');
			push(newHref, newAs);
		} else {
			window.location.href = `/app/${organization?.id}/${branch?.id}/importer-exporter/${url}`;
		}
	};
	return (
		<div
			role="prensentation"
			onClick={() => getRedirectUrl(item.href)}
		>
			<div className={unPrefixedPath === url ? styles.active : styles.text}>{item.title}</div>
		</div>
	);
}

export default NavBarItem;
