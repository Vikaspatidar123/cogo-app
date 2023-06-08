import { Tooltip, cl } from '@cogoport/components';
import { IcMInfo, IcAReports } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function TitleContainer({ billId }) {
	return (
		<>
			<div className={styles.title}>
				<IcAReports width={25} height={25} />
				<div className={styles.title}>Get Accurate Data</div>
			</div>
			{billId && (
				<dv className={`${styles.success_msg} ${styles.txt}`}>
					Dont worry! Your payment was successful.
					<br />
					{' '}
					Please click on validate to check your results!
				</dv>
			)}
			<div className={styles.sub_heading}>
				<div className={cl`${styles.subheading} ${styles.row}`}>
					<div className={styles.txt}>
						<div className={styles.text}>Validate HS Code details</div>
						<div className={styles.hr} />
					</div>
					<Tooltip
						content={(
							<div className={styles.txt}>
								To fetch accurate information, we need to re-validate your cargo
								and HS code information.
							</div>
						)}
						interactive
						placement="top"
						theme="light-border"
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
