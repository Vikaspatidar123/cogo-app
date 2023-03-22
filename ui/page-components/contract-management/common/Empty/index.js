import styles from './styles.module.css';

function Empty({ label, subLabel, svgHeight, svgWidth, icon }) {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.heading}>{label || 'No records found'}</div>
				<div className={styles.Content}>
					{subLabel || 'Looks like you do not have any records for this section'}
				</div>
			</div>
			<div className={styles.ic_container} height={svgHeight} width={svgWidth}>
				{/* {icon || <EmptyIcon />} */}
			</div>
		</div>
	);
}

export default Empty;
