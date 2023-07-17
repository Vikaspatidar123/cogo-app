import { Button } from '@cogoport/components';
import { IcMActivePlans, IcMArrowUp, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

function Details({ director = {}, setShowEdit = () => {}, showEdit, constitutionMapping = {}, updatedValues = {} }) {
	const [showDetails, setShowDetails] = useState(false);
	const {
		name = '', registration_number = '',
		gender = '', din = '', date_of_birth = '', address = '',
	} = director || {};
	const updatedDirectors = updatedValues.director.find((x) => x.registration_number === director.registration_number);

	return (
		<div className={styles.container}>
			<div className={showEdit.show ? styles.company_name : styles.company_wo_border}>
				<div className={styles.company}>
					<IcMActivePlans width={44} height={44} fill="#7278AD" />
					<div className={styles.company_details}>
						<div className={styles.name}>
							{name}
						</div>
					</div>
				</div>
				<div className={styles.company}>
					<Button
						themeType="secondary"
						onClick={() => setShowEdit({
							type : 'director',
							registration_number,
							show : true,
						})}
						type="button"
					>
						<IcMEdit />
						<div className="button_edit">Edit</div>
					</Button>
					<IcMArrowUp
						className={styles.icon}
						onClick={() => setShowDetails((prev) => !prev)}
					/>
				</div>
			</div>
			{showDetails && (
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
							{constitutionMapping.share_percent_label}
							{' '}
							(%)
						</div>
						<div className={styles.value}>
							{updatedDirectors?.shareholder_percentage || '-'}
						</div>
					</div>
					<div className={styles.description}>
						<div className={styles.title}>
							Din
						</div>
						<div className={styles.value}>
							{din}
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
							{date_of_birth || updatedDirectors?.date_of_birth}
						</div>
					</div>
					<div className={styles.address}>
						<div className={styles.title}>
							Address
						</div>
						<div className={styles.value}>
							{address || updatedDirectors?.address}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Details;
