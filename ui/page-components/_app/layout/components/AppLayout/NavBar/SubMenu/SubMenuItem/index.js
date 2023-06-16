/* eslint-disable no-undef */

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function SubMenuItem({ item, unPrefixedPath }) {
	const { push } = useRouter();
	const {
		href = '',
		title = '',
		description = '',
		icon = '',
		as = '',
	} = item || {};

	const renderDescription = (desc) => {
		if (desc.length > 65) {
			return `${desc.substring(0, 65)}...`;
		}
		return desc;
	};

	return (
		<div
			onClick={() => push(href, as)}
			className={unPrefixedPath === href ? styles.active : styles.container}
			role="presentation"
		>
			{icon && (icon || null)}

			{!icon && <div style={{ width: 45, height: 45 }} />}
			<div className={styles.main}>
				<div className={styles.title}>{title}</div>
				<div className={styles.description}>{renderDescription(description)}</div>
			</div>
		</div>
	);
}

export default SubMenuItem;
