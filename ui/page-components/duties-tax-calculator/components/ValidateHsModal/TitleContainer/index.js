import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function TitleContainer({ getDraftData = {} }) {
	return (
		<>
			{getDraftData?.headerResponse && (
				<div className={`${styles.success_msg} ${styles.txt}`}>
					Dont worry! Your payment was successful.
					<br />
					{' '}
					Please click on validate to check your results!
				</div>
			)}
			<div>
				<div className={`${styles.subheading} ${styles.row_div}`}>
					<div className={styles.txt}>
						<div className={styles.text}>Validate HS Code details</div>
						<div className={styles.hr} />
					</div>

					<Tooltip
						content={(
							<div className={styles.text}>
								To fetch accurate information, we need to re-validate your cargo and HS
								code information.
							</div>
						)}
						interactive
						placement="top"
					>
						<div>
							<IcMInfo height={13} width={13} fill="#F68B21" />
						</div>
					</Tooltip>
				</div>

			</div>
		</>
	);
}

export default TitleContainer;
