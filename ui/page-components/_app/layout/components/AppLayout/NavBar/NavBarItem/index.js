/* eslint-disable no-undef */
import styles from '../styles.module.css';

import { useRouter } from '@/packages/next';

function NavBarItem({ item, unPrefixedPath }) {
	const { href, as } = item || {};
	const { push } = useRouter();
	return (
		<div onClick={() => push(href, as)} role="presentation">
			<div className={unPrefixedPath === href ? styles.active : styles.text}>
				{item.title}
			</div>
		</div>
	);
}

export default NavBarItem;
