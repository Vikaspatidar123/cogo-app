import { Button } from '@cogoport/components';
import React from 'react';

import BillingAddressForm from './BillingAddressForm';
import BillingAddressItem from './BillingAddressItem';
import styles from './styles.module.css';
import useBillingAddresses from './useBillingAddresses';

function BillingAddresses(props) {
	const {
		showBookingContactForm = false,
		setShowBookingContactForm = () => {},
		isGstApplicable,
		setIsGstApplicable,
		gstinOptions,
	} = useBillingAddresses(props);

	const { CONSTANTS, state } = props;

	const {
		COMPONENT_KEYS: { ACCOUNT_INFORMATION },
	} = CONSTANTS;

	const { [ACCOUNT_INFORMATION]: accountInformation } = state || {};

	const { addressDetails } = accountInformation || {};
	const { formList } = addressDetails || {};

	return (
		<div className={styles.container}>
			<div className={styles.booking_contact_align}>
				<div className={styles.content}>
					{(formList || []).map((item, index) => (
						<BillingAddressItem
							index={index}
							data={item}
							isGstApplicable={isGstApplicable}
							marginBottom={index === formList.length - 1 ? 0 : 16}
						/>
					))}

					{showBookingContactForm ? (
						<BillingAddressForm
							{...props}
							type="create"
							showBookingContactForm={showBookingContactForm}
							setShowBookingContactForm={setShowBookingContactForm}
							isGstApplicable={isGstApplicable}
							setIsGstApplicable={setIsGstApplicable}
							gstinOptions={gstinOptions}
						/>
					) : (
						<div className={styles.add_more_button_container}>
							<Button
								className="secondary md"
								onClick={() => setShowBookingContactForm(true)}
								style={{ width: '100%', fontSize: 12 }}
							>
								+ Another Address
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default BillingAddresses;
