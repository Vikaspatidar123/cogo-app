import { Pill } from '@cogoport/components';

import styles from './styles.module.css';

function TraderCheck({ tradeEngineResponse = {} }) {
	const { screeningRequestResponse = [], screeningPartyName = '' } =		tradeEngineResponse || {};
	return (
		<>

			<Pill color="blue" size="lg">
				Trader Name:
				{screeningPartyName?.toUpperCase()}
			</Pill>
			{screeningRequestResponse?.length > 0 && (
				<>
					<div className={styles.title}>
						Total Results (
						{screeningRequestResponse?.length}
						)
					</div>
					<div className={styles.row}>
						{screeningRequestResponse.map(({
							screeningAka = '',
							screeningListName = '',
							screeningName = '',
							screeningMatchWeight = 0,
							screeningFedRegDate = '',
							screeningDept = '',
						}) => (
							<div className={styles.card} key={`${screeningName}_${screeningAka}`}>
								<div className={styles.row}>
									<div className={styles.name_column}>{screeningName?.toUpperCase()}</div>
									<div className={styles.column}>
										<div className={screeningMatchWeight < 0.5
											? styles.percentage_red
											: styles.percentage_green}
										>
											{screeningMatchWeight * 100}
											{' '}
											%
										</div>
										<div className={styles.score_text}>Matching score</div>
									</div>
								</div>
								<div className={styles.row}>
									<div className={styles.column}>
										<div className={styles.heading_2}>Listing Name</div>
										<div className={styles.text_2}>{screeningListName}</div>
									</div>
								</div>
								<div className={styles.row}>
									<div className={styles.column}>
										<div className={styles.heading_2}>Department Name</div>
										<div className={styles.text_2}>{screeningDept}</div>
									</div>
									<div className={styles.column}>
										<div className={styles.heading_2}>Registered Date</div>
										<div className={styles.text_2}>{screeningFedRegDate}</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			)}
			{screeningRequestResponse?.length === 0 && (
				<div className={styles.verified_user}>
					<img
						src="https://cdn.cogoport.io/cms-prod/cogo_app/vault/original/secure-icon.svg"
						alt=""
						height={100}
						width={100}
						className={styles.image}
					/>
					<div className={styles.label}>
						<b className={styles.bold}>{screeningPartyName?.toUpperCase()}</b>
						<div> is all clear. You are all set to go trade with this partner.</div>
					</div>
				</div>
			)}
		</>

	);
}

export default TraderCheck;
