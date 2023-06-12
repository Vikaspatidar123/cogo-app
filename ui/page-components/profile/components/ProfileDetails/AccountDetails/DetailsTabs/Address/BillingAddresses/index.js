import { Modal, Badge } from '@cogoport/components';
import {
	IcMArrowRotateDown,
	IcMFtaskNotCompleted,
} from '@cogoport/icons-react';
import { useState } from 'react';

import BillingAddressCard from './BillingAddressCard';
import EditBillingAddress from './EditBillingAddress';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

function BillingAddresses({
	title = '',
	organizationType = '',
	organizationBillingAddressesList = [],
	loading,
	getAddress,
}) {
	const [showEditBillingAddress, setShowEditBillingAddress] = useState(false);

	const [addressIdxToUpdate, setAddressIdxToUpdate] = useState(null);

	const [showData, setShowData] = useState(false);
	const [mobalType, setMobalType] = useState(false);

	const handleCloseModal = () => {
		setShowEditBillingAddress(false);
		setAddressIdxToUpdate(null);
	};
	const renderBillingAddress = () => {
		if (!organizationBillingAddressesList.length) {
			return (
				<div className={styles.empty}>
					<IcMFtaskNotCompleted width={40} height={40} />
					<div className={styles.no_data}>No data Found</div>
				</div>
			);
		}
		return (organizationBillingAddressesList || []).map((address, index) => (
			<BillingAddressCard
				index={index}
				setAddressIdxToUpdate={setAddressIdxToUpdate}
				address={address}
				setMobalType={setMobalType}
				getAddress={getAddress}
			/>
		));
	};
	const addresCount = () => {
		const count = organizationBillingAddressesList.length;
		const value = count === 0 ? 'No Address(s) Added' : `${count} Address(s) Added`;
		return value;
	};
	if (loading) {
		return <LoadingState />;
	}
	return (
		<>
			<div className={styles.main_container}>
				<div className={styles.flex}>
					<div className={styles.body}>
						<div className={styles.flex}>
							<div className={styles.text}>{title}</div>

							<div className={styles.head}>
								<Badge color="#f8f2e7" size="md" text={addresCount()} />
							</div>
						</div>

						<div className={styles.flex}>
							<div
								role="presentation"
								className={styles.link_text}
								onClick={() => {
									setShowEditBillingAddress(true);
									setMobalType(false);
								}}
							>
								+ Add Address
							</div>
						</div>
					</div>

					<div
						role="presentation"
						className={styles.icon_container}
						onClick={() => setShowData(!showData)}

					>
						{showData ? (
							<IcMArrowRotateDown width={20} height={15} style={{ transform: 'rotate(180deg)' }} />
						) : (
							<IcMArrowRotateDown
								width={20}
								height={15}
							/>
						)}
					</div>
				</div>

				<div>{showData ? renderBillingAddress() : null}</div>
			</div>

			{(showEditBillingAddress || addressIdxToUpdate !== null) && (
				<Modal
					show={showEditBillingAddress || addressIdxToUpdate !== null}
					onClose={handleCloseModal}
					closeOnOuterClick={handleCloseModal}
					size="lg"
					scroll
				>
					<EditBillingAddress
						handleCloseModal={handleCloseModal}
						organizationBillingAddressesList={organizationBillingAddressesList}
            // getOrganizationBillingAddress={getOrganizationBillingAddress}
						addressIdxToUpdate={addressIdxToUpdate}
						organizationType={organizationType}
						mobalType={mobalType}
						getAddress={getAddress}
					/>
				</Modal>
			)}
		</>
	);
}
export default BillingAddresses;
