import ApplicationStatus from './ApplicationStatus';
import Query from './Query';
import styles from './styles.module.css';

function Documentation({ getCreditRequestResponse = {} }) {
	const { cogoscore_application_status = '' } = getCreditRequestResponse || {};

	const show = ['awaiting_cogoscore', 'pending_approval', 'assigned'].includes(cogoscore_application_status);

	return (
		<div>
			{show && (
				<div>
					<div className={styles.container}>
						<div>
							<img
								src="https://cdn.cogoport.io/cms-prod/cogo_partner/vault/original/application.png"
								width={160}
								height={130}
								alt="alte"
							/>
						</div>
						<div className={styles.context}>
							<div className={styles.heading}>
								We have received your Pay Later Application
							</div>
							<div className={styles.sub}>
								Our underwriting team is evaluating your application right now
								We will get back you with exact details within 48 hours
							</div>
						</div>
					</div>
					<ApplicationStatus getCreditRequestResponse={getCreditRequestResponse} />
				</div>
			)}
			<Query />
		</div>
	);
}

export default Documentation;
