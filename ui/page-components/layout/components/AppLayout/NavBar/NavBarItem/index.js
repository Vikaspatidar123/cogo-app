import styles from '../styles.module.css';

import { Link } from '@/packages/next';

function NavBarItem({ item, unPrefixedPath }) {
	const urlArray = item.href?.split('v2');
	const url = urlArray.length > 1 ? urlArray[1] : urlArray[0];

	return (
		<Link
			href={url}
			as={url}
			className={styles.a}
		>
			<div className={unPrefixedPath === url ? styles.active : styles.text}>{item.title}</div>
		</Link>
	);
}

export default NavBarItem;
