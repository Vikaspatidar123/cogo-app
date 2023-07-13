import { Button } from '@cogoport/components';
import { IcAAdd, IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';

function Details({ data = {}, setShowEdit = () => {} }) {
	const {
		pan = '',
		name = '',
		address = '',
		gst_number = '',
		date_of_incorporation = '',
		constitution_of_business = '',
	} = data || {};

	const geo = getGeoConstants();
	const REGISTRATION_LABEL = geo.others.registration_number.label;

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
						-
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
						{REGISTRATION_LABEL}
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
						{date_of_incorporation}
					</div>
				</div>
				<div className={styles.address}>
					<div className={styles.title}>
						{REGISTRATION_LABEL}
						{' '}
						Registered Address
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
