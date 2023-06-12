/* eslint-disable no-undef */
import styles from '../styles.module.css';

import { useRouter } from '@/packages/next';

function NavBarItem({ item, unPrefixedPath, getFindUrl }) {
	const url = getFindUrl(item.href);
	const { push } = useRouter();
	const getRedirectUrl = () => {
		push(item.href, item.href);
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
