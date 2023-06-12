/* eslint-disable no-undef */

import { IcMAirSchedules } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function SubMenuItem({ item, unPrefixedPath, getFindUrl }) {
	const { push } = useRouter();
	const {
		href = '', title = '', description = '', icon = '', as = '',
	} = item || {};

	const url = getFindUrl(href);
	const onSubmit = () => {
		push(href, as);
	};

	const renderDescription = (desc) => {
		if (desc.length > 45) {
			return `${desc.substring(0, 45)}...`;
		}
		return desc;
	};

	return (
		<div
			onClick={() => onSubmit()}
			className={unPrefixedPath === url ? styles.active : styles.container}
			role="presentation"
		>
			{icon && (
				icon || <IcMAirSchedules width={50} height={50} fill="red" />
			)}

			{!icon && <div style={{ width: 45, height: 45 }} />}
			<div className={styles.main}>
				<div className={styles.title}>{title}</div>
				<div className={styles.description}>{renderDescription(description)}</div>
			</div>
		</div>
	);
}

export default SubMenuItem;
