import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function TicketStructureLoader({ listType = '' }) {
	const ticketStructureLoaderItems = [
		...Array(listType === 'create' ? 2 : 4).keys(),
	];

	return (
		<div className={styles.tickets_container}>
			{ticketStructureLoaderItems.map((itm) => (
				<div key={itm} className={styles.container}>
					<div className={styles.subcontainer}>
						<div className={styles.subcontainer_header}>
							<Placeholder
								width="100px"
								height="18px"
								className={styles.loading_skeleton}
							/>
							<Placeholder
								width="20px"
								height="18px"
								className={styles.loading_skeleton}
							/>
						</div>
						<div className={styles.description}>
							<Placeholder
								width="230px"
								height="18px"
								className={styles.loading_skeleton}
							/>
						</div>
					</div>
					<div className={styles.subcontainer}>
						<div className={styles.subcontainer_header}>
							<Placeholder
								width="100px"
								height="18px"
								className={styles.loading_skeleton}
							/>
							<div className={styles.ticket_date_time}>
								<div className={styles.ticket_date}>
									<Placeholder
										width="45px"
										height="18px"
										className={styles.loading_skeleton}
									/>
								</div>
								<Placeholder
									width="45px"
									height="18px"
									className={styles.loading_skeleton}
								/>
							</div>
						</div>
						<div className={styles.ticket_reason_box}>
							<Placeholder
								width="230px"
								height="18px"
								className={styles.loading_skeleton}
							/>
							<div className={styles.messages_nos}>
								<Placeholder
									width="20px"
									height="18px"
									className={styles.loading_skeleton}
								/>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default TicketStructureLoader;
