import { Button } from '@cogoport/components';
import { IcMActivePlans, IcMArrowUp, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Details() {
	const [show, setShow] = useState(false);
	return (
		<div className={styles.container}>
			<div className={show ? styles.company_name : styles.company_wo_border}>
				<div className={styles.company}>
					<IcMActivePlans width={44} height={44} fill="#7278AD" />
					<div className={styles.company_details}>
						<div className={styles.name}>
							Director Name
						</div>
					</div>
				</div>
				<div className={styles.company}>
					<Button themeType="secondary">
						<IcMEdit />
						<div className="button_edit">Edit</div>
					</Button>
					<IcMArrowUp className={styles.icon} onClick={() => setShow((prev) => !prev)} />
				</div>
			</div>
			{show && (
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
							Shareholder (%)
						</div>
						<div className={styles.value}>
							-
						</div>
					</div>
					<div className={styles.description}>
						<div className={styles.title}>
							Gender
						</div>
						<div className={styles.value}>
							Male
						</div>
					</div>
					<div className={styles.description}>
						<div className={styles.title}>
							DOB
						</div>
						<div className={styles.value}>
							28/03/2000
						</div>
					</div>
					<div className={styles.address}>
						<div className={styles.title}>
							Address
						</div>
						<div className={styles.value}>
							Technopolis corporate park, 7A, Bldg no 17, Area 51, Andheri (w), Mumbai 400076
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Details;
