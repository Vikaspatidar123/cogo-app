import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

function CardItem({
	item,
	fields,
	loading = false,
	disabled = false,
	isLast = false,
}) {
	return (
		<div
			className={styles.row}
			style={{
				opacity      : disabled ? '0.4' : '1',
				cursor       : disabled ? 'not-allowed' : 'pointer',
				borderBottom : isLast ? 'none' : null,
				borderRadius : isLast ? '0px 0px 4px 4px' : null,
			}}
			// tabIndex="0"
		>
			{fields.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}

				return (
					<div className={styles.col}>
						{loading ? <Placeholder width="100%" height="20px" /> : null}

						<div className={styles.label}>{singleItem.label}</div>

						{singleItem.render && !loading ? singleItem.render(item) : null}

						{!loading && !singleItem.render ? (
							<div className={styles.title_black}>
								{getValue(item, singleItem, false, {}) || '-'}
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

export default CardItem;
