/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/aria-role */
import styles from '../styles.module.css';

import { useRouter } from '@/packages/next';

function NavBarItem({ item, unPrefixedPath }) {
	const { href, as } = item || {};
	const { push } = useRouter();

	return (
		<div role="prensentation" onClick={() => push(href, as)}>
			<div className={unPrefixedPath === href ? styles.active : styles.text}>
				{item.title}
			</div>
		</div>
	);
}

export default NavBarItem;
