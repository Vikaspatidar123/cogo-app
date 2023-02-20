import styles from './styles.module.css';

function MobileView({
	fields, infoData, itm, loading,
}) {
	const data = {};
	fields.forEach((singleItem) => {
		data[singleItem?.label || 'action'] = singleItem;
	});
	return (
		<div className={styles.container}>

			{['Transaction No', 'Bill Type', 'Date'].map((key) => (
				<div className={styles.div}>
					<div className={styles.label}>
						{key}
						:
					</div>
					{/* <div className={styles.value}>{infoData(data[key], itm)}</div> */}
				</div>
			))}
			<div className={styles.flex}>
				<div className={styles.div}>
					<div className={styles.value}>{infoData(data.Status, itm)}</div>
				</div>
				<div className={styles.div}>
					<div className={styles.label}>Amount:</div>
					<div className={styles.value}>{infoData(data.Amount, itm)}</div>
				</div>
			</div>
			{data?.action && (
				<div className={styles.div}>
					<div className={styles.value}>{infoData(data.action, itm)}</div>
				</div>
			)}
		</div>
	);
}
export default MobileView;
