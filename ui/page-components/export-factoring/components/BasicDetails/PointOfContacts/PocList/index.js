import { Pill } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function PocList({ list = [] }) {
	return (
		<div className={styles.container}>

			<div className={styles.header}>
				<div className={styles.label}>
					<span>Name</span>
				</div>
				<div className={styles.label}>
					<span>Email</span>
				</div>
				<div className={styles.label}>
					<span>Contact</span>
				</div>
				<div className={styles.label}>
					<span>Designation</span>
				</div>
			</div>

			{list.map((poc) => (
				<div className={styles.poc_container} key={poc?.id}>
					<div className={styles.row}>
						<div className={styles.col}>
							<span>{poc?.name}</span>
						</div>
						<div className={styles.col}>
							<span>{poc?.email}</span>
						</div>
						<div className={styles.col}>
							<span>
								{poc?.mobile_country_code}
								-
								{poc?.mobile_number}
							</span>
						</div>
						<div className={styles.col}>
							<Pill>
								{poc?.work_scope?.replaceAll('_', ' ')}
							</Pill>
						</div>
					</div>

				</div>
			))}
		</div>
	);
}

export default PocList;
