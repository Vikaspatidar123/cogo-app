import { Modal, Tag } from '@cogoport/components';
import { IcMArrowRotateDown } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import getAddress from '../hooks/getOrganizationBillingAddress';

import BillingAddressCard from './BillingAddressCard';
import EditBillingAddress from './EditBillingAddress';
import LoadingState from './LoadingState';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function BillingAddresses({
	title = '', organizationType = '', organizationBillingAddressesList = [], loading,
}) {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const [showEditBillingAddress, setShowEditBillingAddress] = useState(false);

	const [addressIdxToUpdate, setAddressIdxToUpdate] = useState(null);

	const [showData, setShowData] = useState(false);

	const handleCloseModal = () => {
		setShowEditBillingAddress(false);
		setAddressIdxToUpdate(null);
	};
	const renderBillingAddress = () => {
		if (!organizationBillingAddressesList.length) {
			return (
				<>hello</>
				// <EmptyState
				// 	height={125}
				// 	width={125}
				// 	bottomText={t(
				// 		'profile:accountDetails.tabOptions.address.billingAddress.card.emptyState.bottomText',
				// 	)}
				// />
			);
		}
		return (organizationBillingAddressesList || []).map((address, index) => (
			<BillingAddressCard
				index={index}
				// getOrganizationBillingAddress={getOrganizationBillingAddress}
				setAddressIdxToUpdate={setAddressIdxToUpdate}
				address={address}
			/>
		));
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
							{/* {!isMobile ? (
								<Tag>
									{`${organizationBillingAddressesList.length
										|| t(
											'profile:accountDetails.tabOptions.address.billingAddress.texts.noAddress.1',
										)
										} ${t(
											'profile:accountDetails.tabOptions.address.billingAddress.texts.noAddress.2',
										)}`}
								</Tag>
							) : ( */}
							<div className={styles.text} style={{ marginLeft: 4 }}>
								(
								{organizationBillingAddressesList.length || 0}
								)
							</div>
							{/* )} */}
						</div>

						<div className={styles.flex}>
							<div className={styles.link_text} onClick={() => setShowEditBillingAddress(true)}>
								+ Add Address
							</div>
						</div>
					</div>

					<div className={styles.icon_container} onClick={() => setShowData(!showData)}>
						{showData ? (
							<IcMArrowRotateDown
								width={20}
								height={15}
							/>
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
					{showData ? renderBillingAddress() : null}
				</div>
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
					/>
				</Modal>
			)}
		</>
	);
}
export default BillingAddresses;
