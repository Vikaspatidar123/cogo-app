import { Button } from '@cogoport/components';
import { IcMActivePlans, IcMArrowUp, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Details({ director = {} }) {
	const { name = '', registration_number = '', gender = '', date_of_birth = '', address = '' } = director || {};
	const [show, setShow] = useState(false);
	return (
		<div className={styles.container}>
			<div className={show ? styles.company_name : styles.company_wo_border}>
				<div className={styles.company}>
					<IcMActivePlans width={44} height={44} fill="#7278AD" />
					<div className={styles.company_details}>
						<div className={styles.name}>
							{name}
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
							{registration_number}
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
							{gender === 'M' ? 'Male' : 'Female'}
						</div>
					</div>
					<div className={styles.description}>
						<div className={styles.title}>
							DOB
						</div>
						<div className={styles.value}>
							{date_of_birth}
						</div>
					</div>
					<div className={styles.address}>
						<div className={styles.title}>
							Address
						</div>
						<div className={styles.value}>
							{address}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Details;
