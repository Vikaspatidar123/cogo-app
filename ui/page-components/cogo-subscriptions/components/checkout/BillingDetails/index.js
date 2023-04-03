import { Radio, Button } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import AddressModal from './AddressModal';
import styles from './styles.module.css';

function BillingDetails({
	billingAddress,
	setAddresses,
	addresses,
	checked,
	setChecked,
}) {
	const [addAddressModal, setAddAddressModal] = useState(false);

	useEffect(() => {
		billingAddress({ setAddresses });
	}, [billingAddress, setAddresses]);

	const renderName = (pocDetail) => {
		if (pocDetail?.length > 0) {
			if (pocDetail[0]?.name) {
				return `( ${pocDetail[0]?.name} )`;
			}
			return null;
		}
		return null;
	};

	return (
		<div>
			<div className={styles.wrapper}>
				<div className={styles.label}>Billing Details</div>
				<Button
					size="md"
					className={styles.btn_style}
					themeType="tertiary"
					onClick={() => setAddAddressModal(true)}
				>
					<IcMPlusInCircle fill="#f68b21" height={20} width={20} style={{ marginRight: '4px' }} />
					Add New
				</Button>
			</div>
			{addresses?.length > 0 ? (
				<div className={styles.div}>
					<div className={styles.heading}>Select Address</div>
					<div className={styles.scroll_content}>
						{(addresses || []).map(
							({
								id = '',
								name = '',
								address = '',
								pincode = '',
								tax_number = '',
								organization_pocs = [],
							}) => (
								<div className={styles.address_wrapper}>
									<div className={styles.col_style}>
										<Radio
											checked={checked?.includes(id)}
											onChange={() => setChecked([id])}
										/>
									</div>
									<div
										className={styles.border}
										onClick={() => setChecked([id])}
										role="presentation"
									>
										<div className={`${styles.row} ${styles.name}`}>
											{name}
											{' '}
											{renderName(organization_pocs)}
										</div>
										<div className={`${styles.row} ${styles.address}`}>
											{address}
											,
											{pincode}
										</div>
										<div className={`${styles.row} ${styles.tax_number}`}>
											GST Number :
											{' '}
											{tax_number}
										</div>
									</div>
								</div>
							),
						)}
					</div>
				</div>
			) : (
				<div className={styles.div}>
					<div className={styles.nodata}>
						There are no existing addresses.Try adding an address.
					</div>
				</div>
			)}
			{addAddressModal && (
				<AddressModal
					addAddressModal={addAddressModal}
					setAddAddressModal={setAddAddressModal}
					billingAddress={billingAddress}
					setAddresses={setAddresses}
				/>
			)}
		</div>
	);
}

export default BillingDetails;
