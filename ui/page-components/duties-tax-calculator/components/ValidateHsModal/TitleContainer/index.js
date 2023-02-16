import { ToolTip } from '@cogoport/components';
import { IcMInfo, IcAReports } from '@cogoport/icons-react';

// import {
// 	Title, Txt, SubHeading, Row, Hr,
// } from '../styles';
import styles from '../styles.module.css';

function TitleContainer({ getDraftData = {} }) {
	return (
		<>
			<div className={styles.title_div}>
				<IcAReports width={25} height={25} />
				<div className={styles.title}>Get Accurate Data</div>
			</div>
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
					<ToolTip
						content={(
							<div className={styles.text}>
								To fetch accurate information, we need to re-validate your cargo and HS
								code information.
							</div>
						)}
						interactive
						placement="top"
						theme="light-border"
					>
						<div>
							<IcMInfo height={13} width={13} fill="#F68B21" />
						</div>
					</ToolTip>
				</div>
			</div>
		</>
	);
}

export default TitleContainer;
