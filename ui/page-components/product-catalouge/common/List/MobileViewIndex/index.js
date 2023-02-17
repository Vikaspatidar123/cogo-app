import { Skeleton } from '@cogoport/components';

import styles from './styles.module.css';

function MobileView({
	fields, infoData, itm, loading,
}) {
	const data = {};
	fields.forEach((singleItem) => {
		data[singleItem?.label || 'renderIcon'] = singleItem;
	});
	return (
		<div className={styles.container}>
			{loading ? (
				<>
					{[...Array(5).keys()].map(() => (
						<div className={styles.div_container}>
							<div className={styles.label}>
								<Skeleton height="16px" width="80px" />
							</div>
							<div className={styles.value}>
								<Skeleton height="16px" width="200px" />
							</div>
						</div>
					))}
				</>
			) : (
				<>
					{data?.renderIcon && <div className={styles.icon}>{infoData(data.renderIcon, itm)}</div>}
					{['Name', 'Category', 'SubCategory', 'Cost Price', 'Selling Price'].map(
						(key) => (
							<div className={styles.div_container}>
								<div className={styles.label}>
									{key}
									:
								</div>
								<div className={styles.value}>{infoData(data[key], itm)}</div>
							</div>
						),
					)}
				</>
			)}
		</div>
	);
}
export default MobileView;
