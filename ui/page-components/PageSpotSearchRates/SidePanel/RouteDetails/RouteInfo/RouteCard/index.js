import { IcMArrowDown, IcMCrossInCircle, IcMServices } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Accordion from './Accordion';
import styles from './styles.module.css';

function RouteCard({ icon, isLast, label, showDetails, location_id, handleShow }) {
	const [more, setMore] = useState(false);

	const toggleMore = () => {
		setMore((prev) => !prev);
	};

	return (
		<div className={styles.stop}>
			<div className={styles.left_box}>
				{showDetails ? (
					<div className={`${styles.icon_container} ${styles.main_icon_container}`}>
						{icon}
					</div>
				)
					: (
						<div className={styles.service_icon_container}>
							<IcMServices fill="#4f4f4f" className={styles.service_icon} />
							<div
								role="presentation"
								className={styles.icon_btn_container}
								onClick={handleShow}
							>
								<IcMCrossInCircle
									fill="#4f4f4f"
									className={styles.plus_icon}
								/>
							</div>
						</div>
					)}
				{!isLast ? <div className={styles.vertical_line} /> : null}
			</div>
			<div className={styles.stop_info}>
				{label}
				{more ? (
					<Accordion id={location_id} />
				) : null}
				{showDetails ? (
					<button onClick={toggleMore} className={styles.more_details}>
						more_details
						{' '}
						<IcMArrowDown className={more ? styles.inverse : ''} />
					</button>
				) : null}
			</div>
		</div>
	);
}

export default RouteCard;
