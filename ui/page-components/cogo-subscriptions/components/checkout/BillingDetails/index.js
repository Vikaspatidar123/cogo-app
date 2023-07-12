import { Radio, Button } from '@cogoport/components';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

// import AddressModal from './AddressModal';
import styles from './styles.module.css';

import AddModal from '@/ui/commons/components/CreateOrganizationModel/Components/AddAddressModal';

function BillingDetails({
<<<<<<< HEAD
	billingAddress = () => { },
	// addressApi = () => {},
	setAddresses = () => { },
=======
	billingAddress = () => {},
	addressApi = () => {},
	setAddresses = () => {},
>>>>>>> b088aa535bc5b656959628d42d9f9b679150cb38
	addresses = [],
	checked = false,
	setChecked = () => { },
	addressWithoutGst = [],
	setisBillingAddress = () => { },
}) {
	const addressList = addresses.concat(addressWithoutGst) || [];
	const { t } = useTranslation(['subscriptions']);

	const [addAddressModal, setAddAddressModal] = useState(false);

	useEffect(() => {
		billingAddress({ setAddresses });
		addressApi();
	}, [billingAddress, setAddresses, addressApi]);

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
				<div className={styles.label}>{t('subscriptions:billing_details_text')}</div>
				<Button
					size="md"
					className={styles.btn_style}
					themeType="tertiary"
					onClick={() => setAddAddressModal(true)}
					type="button"
				>
					<IcMPlusInCircle fill="#f68b21" height={20} width={20} style={{ marginRight: '4px' }} />
					{t('subscriptions:add_new_text')}
				</Button>
			</div>
			{addressList?.length > 0 ? (
				<div className={styles.div}>
					<div className={styles.heading}>
						{t('subscriptions:select_address_text')}
					</div>
					<div className={styles.scroll_content}>
						{(addressList || []).map(
							({
								id = '',
								name = '',
								address = '',
								pincode = '',
								tax_number = '',
								organization_pocs = [],
							}) => (
								<div className={styles.address_wrapper} key={id}>
									<div className={styles.col_style}>
										<Radio
											checked={checked?.includes(id)}
											onChange={() => {
												setChecked([id]);
												setisBillingAddress(!!tax_number);
											}}
										/>
									</div>
									<div
										className={styles.border}
										onClick={() => setChecked([id])}
										role="presentation"
									>
										<div className={`${styles.row} ${styles.name}`}>
											{name}
											{renderName(organization_pocs)}
										</div>
										<div className={`${styles.row} ${styles.address}`}>
											{address}
											,
											{pincode}
										</div>
										<div className={`${styles.row} ${styles.tax_number}`}>
											{t('subscriptions:gst_number_text')}
											{' '}
											:
											{tax_number}
										</div>
									</div>
									{/* {address_type && (
										<div className={`${styles.row}`}>
											<div className="icons">{Icons?.[address_type]}</div>
											<StyledTag className="primary">{address_type}</StyledTag>
										</div>
									)} */}
								</div>
							),
						)}
					</div>
				</div>
			) : (
				<div className={styles.div}>
					<div className={styles.nodata}>
						{t('subscriptions:addresses_description_text')}
					</div>
				</div>
			)}
			{addAddressModal && (
				<AddModal
					addAddressModal={addAddressModal}
					setAddAddressModal={setAddAddressModal}
				/>
			)}
		</div>
	);
}

export default BillingDetails;
