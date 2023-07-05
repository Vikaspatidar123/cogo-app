import { Button } from '@cogoport/components';
import { IcAAdd, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Details({ data = {}, setShowEdit = () => {},	updatedValues = {}, getCreditRequestResponse = {} }) {
	const {
		pan = '',
		name = '',
		address = '',
		gst_number = '',
		date_of_incorporation = '',
		constitution_of_business = '',

	} = data || {};
	const { date_of_incorporation:update_date_of_incorporation = '' } = updatedValues.values || {};
	const { org_iec_number = '' } = getCreditRequestResponse || {};

	return (
		<div className={styles.container}>
			<div className={styles.company_name}>
				<div className={styles.company}>
					<IcAAdd width={44} height={44} />
					<div className={styles.company_details}>
						<div className={styles.name}>
							{name}
						</div>
						<div className={styles.type}>
							{constitution_of_business}
						</div>
					</div>
				</div>
				<Button themeType="secondary" onClick={() => setShowEdit({ show: true, type: 'company' })}>
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
						{pan}
					</div>
				</div>
				<div className={styles.description}>
					<div className={styles.title}>
						IEC
					</div>
					<div className={styles.value}>
						{org_iec_number}
					</div>
				</div>
				<div className={styles.description}>
					<div className={styles.title}>
						CIN/LLPIN
					</div>
					<div className={styles.value}>
						-
					</div>
				</div>
				<div className={styles.description}>
					<div className={styles.title}>
						GST
					</div>
					<div className={styles.value}>
						{gst_number}
					</div>
				</div>
				<div className={styles.description}>
					<div className={styles.title}>
						Date of Incorporation
					</div>
					<div className={styles.value}>
						{date_of_incorporation || update_date_of_incorporation}
					</div>
				</div>
				<div className={styles.address}>
					<div className={styles.title}>
						GST Registered Address
					</div>
					<div className={styles.value}>
						{address}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Details;
