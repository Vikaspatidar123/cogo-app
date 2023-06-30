import { IcAWarehouse } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

import { getCountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';
import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();
const REGISTRATION_LABEL = getCountrySpecificData({
	country_id    : geo.country.id,
	accessorType  : 'registration_number',
	accessor      : 'label',
	isDefaultData : true,
});
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
				{`${REGISTRATION_LABEL} Number :`}
				{' '}
				{taxNumber || 'Not Applicable'}
			</div>
		</div>
	);
}

export default BillingDetails;
