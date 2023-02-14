/* eslint-disable jsx-a11y/no-static-element-interactions */

import { IcMAirSchedules } from '@cogoport/icons-react';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function SubMenuItem({ item, unPrefixedPath, getFindUrl }) {
	const { push } = useRouter();
	const {
		href = '', title = '', description = '', icon = '', as = '',
	} = item || {};
	const url = getFindUrl(href);
	const { profile } = useSelector((s) => s);
	const { organization, branch } = profile || {};
	const onSubmit = () => {
		if (href?.includes('/v2')) {
			const newHref = href?.replace('/v2', '');
			const newAs = as?.replace('/v2', '');
			push(newHref, newAs);
			// window.location.href = `/v2/${organization?.id}/${branch?.id}/${newHref || newAs}`;
		} else {
			window.location.href = `/app/${organization?.id}/${branch?.id}/importer-exporter/${href || as}`;
		}
	};
	// const Element = icon || ICON_MAPPING[title] || IcMAirSchedules;

	return (
		<div
			onClick={() => onSubmit()}
			className={unPrefixedPath === url ? styles.active : styles.container}
		>
			{icon && (
				icon || <IcMAirSchedules width={50} height={50} fill="red" />
			)}

			{!icon && <div style={{ width: 45, height: 45 }} />}
			<div className={styles.main}>
				<div className={styles.title}>{title}</div>
				<div className={styles.description}>{description}</div>
			</div>
		</div>
	);
}

export default SubMenuItem;
