import { StarIcon } from '../../../../configuration/icon-configuration';

import styles from './styles.module.css';

function Stepper({ logo_url, containerStatus, shipping_line_name }) {
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
				{containerStatus.map((item, index) => (
					<>
						{console.log(index, 'index')}
						<div className={`${(index !== 3 || index === null) && styles.dot_line_style}`}>
							<div className={`${item ? styles.active_dot : styles.dot}`} />
							{index !== 3 && <div className={`${item ? styles.active_line : styles.line}`} />}
						</div>
					</>
				))}
			</div>
			<div className={styles.legend_ctn}>
				<div className={styles.legend_name}>
					Origin
				</div>
				<div className={styles.legend_name}>
					Port of loading
				</div>
				<div className={styles.legend_name}>
					Port of discharge
				</div>
				<div className={styles.legend_name}>
					Destination
				</div>
			</div>
		</div>
	);
}

export default Stepper;
