import { IcMFship } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';

import styles from './styles.module.css';

function Footer({ item }) {
	return (
		<div className={styles.container}>
			<div className={styles.fouth_data}>
				<div className={styles.first_row}>
					<IcMFship
						className={styles.image}
					/>
					{item?.selected_schedule_departure && (
						<p
							className={styles.arrive}
						>
							<span
								className={styles.span}
							>
								ETD: &nbsp;
							</span>
							image
							{format(
								item?.selected_schedule_departure,
								'dd/MM/yyyy',
							)}
						</p>
					)}
				</div>
				{item?.selected_schedule_arrival && (
					<p className={styles.dept}>
						<span
							className={styles.span}
						>
							ETA: &nbsp;
						</span>
						{format(
							item?.selected_schedule_arrival,
							'dd/MM/yyyy',
						)}
					</p>
				)}
				{item?.last_updated_at && (
					<p className={styles.update}>
						<span
							className={styles.span}
						>
							Updated At: &nbsp;
						</span>
						{format(
							item?.last_updated_at,
							'dd/MM/yyyy',
						)}
					</p>
				)}
			</div>
		</div>
	);
}
export default Footer;
