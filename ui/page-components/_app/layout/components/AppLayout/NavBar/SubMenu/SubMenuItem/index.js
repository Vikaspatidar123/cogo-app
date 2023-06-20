import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

const MAX_DESC_LENGTH = 65;

const renderDescription = (desc) => {
	if (desc.length > MAX_DESC_LENGTH) {
		return `${desc.substring(0, MAX_DESC_LENGTH)}...`;
	}
	return desc;
};

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

			{icon || <div style={{ width: 45, height: 45 }} />}

			<div className={styles.main}>
				<div className={styles.title}>{title}</div>
				<div className={styles.description}>{renderDescription(description)}</div>
			</div>
		</div>
	);
}

export default SubMenuItem;
