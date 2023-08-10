import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

const INIT_IDX = 2;
const FINAL_IDX = 4;

function TicketStructureLoader({ listType = '' }) {
	const ticketStructureLoaderItems = [
		...Array(listType === 'create' ? INIT_IDX : FINAL_IDX).keys(),
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
