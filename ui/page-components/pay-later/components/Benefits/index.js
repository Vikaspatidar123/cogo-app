import { BENEFITS } from '../../constants/benefits';

import styles from './styles.module.css';

function Benefits() {
	return (
		<div className={styles.wrapper}>
			{BENEFITS.map((item) => (
				<div className={styles.card}>
					<div className={styles.image}>
						{item.icon}
					</div>
					<div className={styles.text}>
						<span className={styles.heading}>
							{item.heading}
							.
						</span>
						<span className={styles.sub_heading}>{item.subHeading}</span>
					</div>
				</div>
			))}
		</div>
	);
}

export default Benefits;
