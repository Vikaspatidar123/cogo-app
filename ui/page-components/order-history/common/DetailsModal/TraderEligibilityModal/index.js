import styles from './styles.module.css';

function TraderEligibilityModal({ tradeEngineResponse = {} }) {
	const { screeningRequestResponse = {}, screeningPartyName = '' } =		tradeEngineResponse || {};
	return (
		<>
			<div className={styles.styled_tag}>
				Trader Name:
				{screeningPartyName.toUpperCase()}
			</div>
			{screeningRequestResponse?.length > 0 && (
				<>
					<div className={styles.title}>
						Total Results (
						{screeningRequestResponse.length}
						)
					</div>

					<div className={styles.list_wrapper}>
						{(screeningRequestResponse || []).map(
							({
								screeningAka = '',
								screeningListName = '',
								screeningName = '',
								screeningMatchWeight = 0,
								screeningFedRegDate = '',
								screeningDept = '',
							}) => (
								<div
									className={styles.card}
									key={`${screeningName}_${screeningAka}`}
								>
									<div className={styles.styled_row}>
										<div className={styles.name_column}>{screeningName?.toUpperCase()}</div>
										<div className={styles.column}>
											<div className={styles.percentage} weight={screeningMatchWeight}>
												{screeningMatchWeight * 100}
												%
											</div>
											<div className={styles.score_text}>Matching score</div>
										</div>
									</div>
									<div className={styles.styled_row}>
										<div className={styles.column}>
											<div className={styles.heading2}>Listing Name</div>
											<div className={styles.text2}>{screeningListName}</div>
										</div>
									</div>
									<div className={styles.styled_row}>
										<div className={styles.column}>
											<div className={styles.heading2}>Department Name</div>
											<div className={styles.text2}>{screeningDept}</div>
										</div>
										<div className={styles.column}>
											<div className={styles.heading2}>Registered Date</div>
											<div className={styles.text2}>{screeningFedRegDate}</div>
										</div>
									</div>
								</div>
							),
						)}
					</div>
				</>
			)}
			{screeningRequestResponse?.length === 0 && (
				<div className={`_${styles.list_wrapper} ${styles.verifieduser}`}>
					{/* <SecureIcon height={100} width={100} /> */}
					<div className={styles.label}>
						<b className="bold">{screeningPartyName.toUpperCase()}</b>
						<div> is all clear. You are all set to go trade with this partner.</div>
					</div>
				</div>
			)}
		</>
	);
}

export default TraderEligibilityModal;
