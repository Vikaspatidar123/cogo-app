import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

function CardItem({ item, fields, handleClick, loading = false }) {
	return (
		<div
			role="presentation"
			onClick={handleClick}
			className={`${styles.row} ${item.expired ? styles.expired : ''}`}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					handleClick();
				}
			}}
		>
			{fields.map((singleItem) => (
				<div
					className={styles.col}
					key={singleItem?.key}
				>
					{loading && <Placeholder width="100%" height="20px" />}
					<div className={styles.label}>{singleItem.label}</div>
					{singleItem.render && !loading ? singleItem.render(item) : null}
					{!loading && !singleItem.render ? (
						<div className={styles.title_back}>
							{getValue(item, singleItem, false, {}) || '-'}
						</div>
					) : null}
				</div>
			))}
		</div>
	);
}

export default CardItem;
