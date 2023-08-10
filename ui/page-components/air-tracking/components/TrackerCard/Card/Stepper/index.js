import styles from './styles.module.css';

function Stepper({ logo_url, containerStatus, air_line_name, locationTracking }) {
	return (
		<div className={styles.container}>
			<div className={styles.template}>
				<div className={styles.sticker}>
					{logo_url !== null
					&& <img src={logo_url} alt="" width="80px" height="10px" className={styles.icon_image} />}
					<div>
						{air_line_name}
					</div>
				</div>
			</div>
			<div className={styles.combined_div}>
				{containerStatus.map((item, index) => (
					<div className={(index !== 3 || index === null) && styles.dot_line_style}>
						<div className={item ? styles.active_dot : styles.dot} />
						{index !== 3 && <div className={item ? styles.active_line : styles.line} />}
					</div>
				))}
			</div>
			<div className={styles.legend_ctn}>
				<div className={styles.legend_name}>
					Origin
				</div>
				<div className={styles.legend_name}>
					{locationTracking?.origin}
				</div>
				<div className={styles.legend_name}>
					{locationTracking?.destination}
				</div>
				<div className={styles.legend_name}>
					Destination
				</div>
			</div>
		</div>
	);
}

export default Stepper;
