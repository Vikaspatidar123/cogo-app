import Link from 'next/link';

import styles from '../styles.module.css';

import { useSelector } from '@/packages/store';

function NavBarItem({ item }) {
	const { unPrefixedPath } = useSelector(({ general }) => general);

	return (
		<Link
			href={item.href}
			as={item.as}
			className={styles.a}
			// className={unPrefixedPath === item.href ? 'active' : ''}
		>
			{item.label}
		</Link>
	);
}

export default NavBarItem;
