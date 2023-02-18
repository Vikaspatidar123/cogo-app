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
			{loading ? (
				<>
					Skeleton
					{/* {[...Array(5).keys()].map(() => (
						<div className={styles.div}>
							<div className={styles.label}>
								<Skeleton height="16px" width="80px" />
							</div>
							<div className={styles.value}>
								<Skeleton height="16px" width="200px" />
							</div>
						</div>
					))} */}
				</>
			) : (
				<>
					{['Transaction No', 'Bill Type', 'Date'].map((key) => (
						<div className={styles.div}>
							<div className={styles.label}>
								{key}
								:
							</div>
							<div className={styles.value}>{infoData(data[key], itm)}</div>
						</div>
					))}
					{/* <Flex> */}
					<div className={styles.div}>
						<div className={styles.value}>{infoData(data.Status, itm)}</div>
					</div>
					<div className={styles.div}>
						<div className={styles.label}>Amount:</div>
						<div className={styles.value}>{infoData(data.Amount, itm)}</div>
					</div>
					{/* </Flex> */}
					{data?.action && (
						<div className={styles.div}>
							<div className={styles.value}>{infoData(data.action, itm)}</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
export default MobileView;
