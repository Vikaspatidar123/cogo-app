import { IcAWarehouse } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();
const REGISTRATION_LABEL = geo.others.registration_number.label;

function BillingDetails({
	address,
	taxNumber,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.billing_address_container}>
				<div className={styles.billing_address}>
					<IcAWarehouse className="house-icon" />
					{startCase(address)}
				</div>
			</div>

			<div className={styles.text}>
				{REGISTRATION_LABEL}
				{' '}
				Number :
				{' '}
				{taxNumber || 'Not Applicable'}
			</div>
		</div>
	);
}

export default BillingDetails;
