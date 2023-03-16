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
								<div />
							</div>
						))}
					</div>
				</>
			)}
		</>

	);
}

export default TraderCheck;
