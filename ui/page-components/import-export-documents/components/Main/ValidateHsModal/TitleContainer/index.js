import { cl, Tooltip } from '@cogoport/components';
import { IcMInfo, IcAReports } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function TitleContainer({ billId }) {
	return (
		<>
			<div className={styles.title_container}>
				<IcAReports width={25} height={25} />
				<div className={styles.title}>Get Accurate Data</div>
			</div>
			{billId && (
				<div className={cl`${styles.txt} ${styles.success_msg}`}>
					Dont worry! Your payment was successful.
					<br />
					{' '}
					Please click on validate to check your results!
				</div>
			)}
			<div>
				<div className={cl`${styles.row_container} ${styles.subheading}`}>
					<div className={styles.txt}>
						<div className={styles.text}>Validate HS Code details</div>
						<div className={styles.hr} />
					</div>
					<Tooltip
						content={(
							<div className={styles.txt}>
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
