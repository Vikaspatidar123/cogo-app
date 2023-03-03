/* eslint-disable no-undef */

import { IcMAirSchedules } from '@cogoport/icons-react';

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

	return (
		<div
			onClick={() => push(href, as)}
			className={unPrefixedPath === href ? styles.active : styles.container}
			role="presentation"
		>
			{icon && (icon || <IcMAirSchedules width={50} height={50} fill="red" />)}

			{!icon && <div style={{ width: 45, height: 45 }} />}
			<div className={styles.main}>
				<div className={styles.title}>{title}</div>
				<div className={styles.description}>{description}</div>
			</div>
		</div>
	);
}

export default SubMenuItem;
