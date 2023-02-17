import { Modal, Tag, Toast } from '@cogoport/components';
import { IcACreateAnAccount } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import EditOtherAddress from './EditOtherAddress';
import LoadingState from './LoadingState';
import OtherAddressCard from './OtherAddressCard';
import styles from './styles.module.css';
import getOtherAddressOptions from './utils/get-other-address-options';

import useRequest from '@/packages/request';
import { useSelector } from '@/packages/store';

function OtherAddresses({ addressesData }) {
	const {
		general: { isMobile },
	} = useSelector((state) => state);

	const { t } = useTranslation(['profile']);

	const OTHER_ADDRESSES_MAPPING = getOtherAddressOptions({ t });

	const [editOtherAddresKey, setEditOtherAddressKey] = useState(null);

	const [otherAddressObjToUpdate, setOtherAddressObjToUpdate] = useState({});

	const [showData, setShowData] = useState({});

	const organizationOtherAddressesList = addressesData?.data || {};

	// useEffect(() => {
	// 	getOrganizationOtherAddresses();
	// }, [organizationType]);

	const renderAddressCards = ({ address_key }) => (organizationOtherAddressesList[address_key.api_property_key])?.map(
		(other_address_data, index) => (
			<OtherAddressCard
				// getOrganizationOtherAddresses={getOrganizationOtherAddresses}
				setOtherAddressObjToUpdate={setOtherAddressObjToUpdate}
				index={index}
				other_address_data={other_address_data}
			/>

		),
	);
	// if (
	// 	(organizationOtherAddressesList?.[address_key.api_property_key] || [])
	// 		.length === 0
	// ) {
	// 	return (
	// 		<EmptyState
	// 			height={125}
	// 			width={125}
	// 			bottomText={t(
	// 				'profile:accountDetails.tabOptions.address.otherAddresses.card.emptyState.bottomText',
	// 			)}
	// 		/>
	// 	);
	// }

	const handleCloseModal = () => {
		setEditOtherAddressKey(null);
		setOtherAddressObjToUpdate({});
	};

	// if (loading) {
	// 	return <LoadingState />;
	// }

	return (
		<>
			{Object.values(OTHER_ADDRESSES_MAPPING).map((address_key) => (
				<div className={styles.main_container}>
					<div className={styles.flex}>
						<div className={styles.body}>
							<div className={styles.flex}>
								<div className={styles.text}>
									{`${address_key.label} ${t(
										'profile:accountDetails.tabOptions.address.otherAddresses.texts.heading',
									)}`}

								</div>
								{/* {!isMobile ? (
										<Tag>
											{`${organizationOtherAddressesList?.[
												address_key.api_property_key
											]?.length
												|| t(
													'profile:accountDetails.tabOptions.address.otherAddresses.texts.noAddress.1',
												)
												} ${t(
													'profile:accountDetails.tabOptions.address.otherAddresses.texts.noAddress.2',
												)}`}
										</Tag>
									) :  */}
								{/* ( */}
								<div className={styles.text} style={{ marginLeft: 4 }}>
									{/* (
										{organizationOtherAddressesList.length || 0}
										) */}
									ok
								</div>
								{/* )} */}
							</div>
							<div className={styles.flex}>
								<div className={styles.link_text} onClick={() => setEditOtherAddressKey(address_key)}>
									otherAddresses.texts.addAddress
								</div>
							</div>
						</div>

						<div
							className={styles.icon_container}
							onClick={() => setShowData((ps) => ({
								...ps,
								[address_key.api_property_key]:
										!ps[address_key.api_property_key],
							}))}
						>
							{showData[address_key.api_property_key] ? (
								<IcACreateAnAccount style={{ width: 12, height: 8 }} />
							) : (
								<IcACreateAnAccount
									style={{ width: 12, height: 8, transform: 'rotate(180deg)' }}
								/>
							)}
						</div>
					</div>

					<div className={styles.flex} direction="column">
						{showData[address_key.api_property_key]
								&& renderAddressCards({ address_key })}
					</div>
				</div>
			))}

			{(!!editOtherAddresKey
					|| Object.keys(otherAddressObjToUpdate).length !== 0) && (
						<Modal
							className="primary lg"
							show={
								!!editOtherAddresKey
								|| Object.keys(otherAddressObjToUpdate).length !== 0
							}
							onClose={handleCloseModal}
							onOuterClick={handleCloseModal}
							width={750}
							styles={{ dialog: { width: isMobile && 'unset' } }}
						>
							<EditOtherAddress
								// organizationOtherAddressesList={organizationOtherAddressesList}
								otherAddressObjToUpdate={otherAddressObjToUpdate}
								address_key={editOtherAddresKey}
								handleCloseModal={handleCloseModal}
								organizationType={organizationType}
							// getOrganizationOtherAddresses={getOrganizationOtherAddresses}
							/>
						</Modal>
			)}
		</>
	);
}

export default OtherAddresses;
