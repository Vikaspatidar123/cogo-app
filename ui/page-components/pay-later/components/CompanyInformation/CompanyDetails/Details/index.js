import { Button } from '@cogoport/components';
import { IcAAdd, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Details() {
	return (
		<div className={styles.container}>
			<div className={styles.company_name}>
				<div className={styles.company}>
					<IcAAdd width={44} height={44} />
					<div className={styles.company_details}>
						<div className={styles.name}>
							Company Name
						</div>
						<div className={styles.type}>
							Partnership
						</div>
					</div>
				</div>
				<Button themeType="secondary">
					<IcMEdit />
					<div className="button_edit">Edit</div>
				</Button>
			</div>
			<div className={styles.details}>
				<div className={styles.description}>
					<div className={styles.title}>
						PAN
					</div>
					<div className={styles.value}>
						KJEPS1369M
					</div>
				</div>
				<div className={styles.description}>
					<div className={styles.title}>
						IEC
					</div>
					<div className={styles.value}>
						SC120984736
					</div>
				</div>
				<div className={styles.description}>
					<div className={styles.title}>
						CIN/LLPIN
					</div>
					<div className={styles.value}>
						SC120984736
					</div>
				</div>
				<div className={styles.description}>
					<div className={styles.title}>
						GST
					</div>
					<div className={styles.value}>
						SC120984736
					</div>
				</div>
				<div className={styles.description}>
					<div className={styles.title}>
						Date of Incorporation
					</div>
					<div className={styles.value}>
						02 Jan 1985
					</div>
				</div>
				<div className={styles.address}>
					<div className={styles.title}>
						GST Registered Address
					</div>
					<div className={styles.value}>
						Technopolis corporate park, 7A, Bldg no 17, Area 51, Andheri (w), Mumbai 400076
					</div>
				</div>
			</div>
		</div>
	);
}

export default Details;
