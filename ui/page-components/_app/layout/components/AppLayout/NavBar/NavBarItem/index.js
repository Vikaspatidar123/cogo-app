/* eslint-disable no-undef */
import styles from '../styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function NavBarItem({ item, unPrefixedPath, getFindUrl }) {
	const url = getFindUrl(item.href);
	const { push } = useRouter();
	const { profile } = useSelector((s) => s);
	const { organization, branch } = profile || {};
	const getRedirectUrl = () => {
		if (item.href?.includes('/v2')) {
			const newHref = item.href?.replace('/v2', '');
			const newAs = item.href?.replace('/v2', '');
			push(newHref, newAs);
		} else {
			window.location.href = `/app/${organization?.id}/${branch?.id}/importer-exporter/${url}`;
		}
	};
	return (
		<div onClick={() => getRedirectUrl()} role="presentation">
			<div className={unPrefixedPath === url ? styles.active : styles.text}>
				{item.title}
			</div>
		</div>
	);
}

export default NavBarItem;
