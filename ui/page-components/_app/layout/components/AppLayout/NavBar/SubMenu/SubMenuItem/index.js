import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

const renderDescription = (desc) => {
	if (desc.length > 45) {
		return `${desc.substring(0, 45)}...`;
	}
	return desc;
};

function SubMenuItem({ item, unPrefixedPath, getFindUrl }) {
	const { push } = useRouter();
	const {
		href = '', title = '', description = '', icon, as = '',
	} = item || {};
	
	const url = getFindUrl(href);
	const { profile } = useSelector((s) => s);

	const { organization, branch } = profile || {};
	const onSubmit = () => {
		if (href?.includes('/v2')) {
			const newHref = href?.replace('/v2', '');
			const newAs = as?.replace('/v2', '');
			push(newHref, newAs);
		} else {
			window.location.href = `/app/${organization?.id}/${branch?.id}/importer-exporter/${href || as}`;
		}
	};

	return (
		<div
			onClick={() => onSubmit()}
			className={unPrefixedPath === url ? styles.active : styles.container}
			role="presentation"
		>

			{icon || <div style={{ width: 45, height: 45 }} />}

			<div className={styles.main}>
				<div className={styles.title}>{title}</div>
				<div className={styles.description}>{renderDescription(description)}</div>
			</div>
		</div>
	);
}

export default SubMenuItem;
