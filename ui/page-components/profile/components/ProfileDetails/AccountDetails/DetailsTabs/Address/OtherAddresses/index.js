import { Modal } from '@cogoport/components';
import {
	IcMArrowRotateDown,
	IcMFtaskNotCompleted,
} from '@cogoport/icons-react';
import { useState } from 'react';

import EditOtherAddress from './EditOtherAddress';
import LoadingState from './LoadingState';
import OtherAddressCard from './OtherAddressCard';
import styles from './styles.module.css';
import getOtherAddressOptions from './utils/get-other-address-options';

function OtherAddresses({ addressesData, addressLoading }) {
	const OTHER_ADDRESSES_MAPPING = getOtherAddressOptions();

	const [editOtherAddresKey, setEditOtherAddressKey] = useState(null);

	const [otherAddressObjToUpdate, setOtherAddressObjToUpdate] = useState({});

	const [showData, setShowData] = useState({});

	const organizationOtherAddressesList = addressesData?.list || {};

	// useEffect(() => {
	// 	getOrganizationOtherAddresses();
	// }, [organizationType]);
	const filterAddress = (address_key) => {
		const listData = (organizationOtherAddressesList || []).filter(
			(item) => item.address_type === address_key.api_property_key,
		);
		return listData || [];
	};
	const renderAddressCards = ({ address_key }) => {
		const data = filterAddress(address_key);
		if ((data || []).length === 0) {
			return (
				<div className={styles.empty}>
					<IcMFtaskNotCompleted width={40} height={40} />
					<div className={styles.no_data}>No data Found</div>
				</div>
			// <EmptyState
			// 	height={125}
			// 	width={125}
			// 	bottomText={t(
			// 		'profile:accountDetails.tabOptions.address.otherAddresses.card.emptyState.bottomText',
			// 	)}
			// />
			);
		}
		return (data || []).map((other_address_data, index) => (
			<OtherAddressCard
        // getOrganizationOtherAddresses={getOrganizationOtherAddresses}
				setOtherAddressObjToUpdate={setOtherAddressObjToUpdate}
				index={index}
				other_address_data={other_address_data}
			/>
		));
	};

	const handleCloseModal = () => {
		setEditOtherAddressKey(null);
		setOtherAddressObjToUpdate({});
	};

	if (addressLoading) {
		return <LoadingState />;
	}

	return (
		<>
			{Object.values(OTHER_ADDRESSES_MAPPING).map((address_key) => (
				<div className={styles.main_container}>
					<div className={styles.flex}>
						<div className={styles.body}>
							<div className={styles.flex}>
								<div className={styles.text}>{address_key.label}</div>
							</div>
							<div className={styles.flex}>
								<div
									className={styles.link_text}
									onClick={() => setEditOtherAddressKey(address_key)}
									role="presentation"
								>
									+ Add Address
								</div>
							</div>
						</div>

						<div
							className={styles.icon_container}
							onClick={() => setShowData((ps) => ({
								...ps,
								[address_key.api_property_key]: !ps[address_key.api_property_key],
							}))}
							role="presentation"
						>
							{showData[address_key.api_property_key] ? (
								<IcMArrowRotateDown width={20} height={15} />
							) : (
								<IcMArrowRotateDown
									width={20}
									height={15}
									style={{ transform: 'rotate(180deg)' }}
								/>
							)}
						</div>
					</div>

					<div>
						{showData[address_key.api_property_key]
              && renderAddressCards({ address_key })}
					</div>
				</div>
			))}

			{(!!editOtherAddresKey
        || Object.keys(otherAddressObjToUpdate).length !== 0) && (
	<Modal
		show={
            !!editOtherAddresKey
            || Object.keys(otherAddressObjToUpdate).length !== 0
          }
		onClose={handleCloseModal}
		closeOnOuterClick={handleCloseModal}
		size="lg"
	>
		<EditOtherAddress
            // organizationOtherAddressesList={organizationOtherAddressesList}
			otherAddressObjToUpdate={otherAddressObjToUpdate}
			address_key={editOtherAddresKey}
			handleCloseModal={handleCloseModal}
		/>
	</Modal>
			)}
		</>
	);
}

export default OtherAddresses;
