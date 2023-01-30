import styles from '../styles.module.css';

import { Link } from '@/packages/next';

function NavBarItem({ item, unPrefixedPath }) {
	return (
		<Link
			href={item.href}
			as={item.as}
			className={styles.a}
		>
			<div className={unPrefixedPath === item.href ? styles.active : styles.text}>{item.title}</div>
		</Link>
	);
}

export default NavBarItem;
