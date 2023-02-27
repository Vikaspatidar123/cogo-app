import { StarIcon } from '../../../../configuration/icon-configuration';

import styles from './styles.module.css';

function Stepper({ trackerDetails }) {
	const logo_url = trackerDetails?.shipping_line?.logo_url;
	const shipping_line_name = trackerDetails?.shipping_line?.short_name;

	const stepper = trackerDetails?.milestones[0]?.container_status?.bool_status || [false, false, false, false];

	return (
		<div className={styles.container}>
			<div className={styles.template}>
				<div className={styles.sticker}>
					<img src={logo_url} alt="" width="80px" height="10px" className={styles.icon_image} />
					<div>
						{shipping_line_name}
					</div>
				</div>
			</div>
			<div className={styles.legend_ctn}>
				<div className={styles.legend_name}>
					1 parts
				</div>
				<div className={styles.legend_name}>
					1 part
				</div>
				<div className={styles.legend_name}>
					1 part
				</div>
				<div className={styles.legend_name}>
					1 part
				</div>
			</div>
			<div className={styles.combined_div}>
				{/* <div className={styles.dot_line_style}>
					<div className={`${stepper[0] ? styles.active_dot : styles.dot}`} />
					<div className={`${stepper[0] ? styles.active_line : styles.line}`} />
				</div>
				<div className={styles.dot_line_style}>
					<div className={`${stepper[1] ? styles.active_dot : styles.dot}`} />
					<div className={`${stepper[1] ? styles.active_line : styles.line}`} />
				</div>
				<div className={styles.dot_line_style}>
					<div className={`${stepper[2] ? styles.active_dot : styles.dot}`} />
					<div className={`${stepper[2] ? styles.active_line : styles.line}`} />
				</div>
				<div className={`${styles.dot_line_style} ${styles.last_element}`}>
					<div className={`${stepper[2] ? styles.active_dot : styles.dot}`} />
				</div> */}
				{stepper.map((item, index) => (
					<>
						{console.log(index, 'index')}
						<div className={`${(index !== 3 || index === null) && styles.dot_line_style}`}>
							<div className={`${stepper[index] ? styles.active_dot : styles.dot}`} />
							{index !== 3 && <div className={`${stepper[index] ? styles.active_line : styles.line}`} />}
						</div>
					</>
				))}
			</div>
			<div className={styles.legend_ctn}>
				<div className={styles.legend_name}>
					3 locations
				</div>
				<div className={styles.legend_name}>
					SHA
				</div>
				<div className={styles.legend_name}>
					NSA
				</div>
				<div className={styles.legend_name}>
					2 locations
				</div>
			</div>
		</div>
	);
}

export default Stepper;
