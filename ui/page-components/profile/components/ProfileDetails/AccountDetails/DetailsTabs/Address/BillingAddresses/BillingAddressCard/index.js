/* eslint-disable no-unused-vars */
import { Modal, Button } from '@cogoport/components';
import { IcMDocument, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import AddEditPocDetails from '../../AddEditPocDetails';

import styles from './styles.module.css';

import getValue from '@/ui/commons/utils/getValue';

function AddressCard({
	getOrganizationBillingAddress = {},
	address,
	setAddressIdxToUpdate = () => {},
	index,
	setMobalType,
	getAddress,
}) {
	const [showPocDetails, setShowPocDetails] = useState(false);

	const [showPocModal, setShowPocModal] = useState(null);

	const [pocToUpdate, setPocToUpdate] = useState({});

	const gstDocName = getValue(address, 'tax_number_document_url', '')
		?.split('/')
		?.pop();

	const handleOpenDocument = (url) => {
		let modifiedUrl = `https://${url}`;
		if (url?.includes('http://') || url?.includes('https://')) {
			modifiedUrl = url;
		}
		// eslint-disable-next-line no-undef
		window.open(modifiedUrl, '_blank');
	};

	const { organization_pocs = [] } = address;

	return (
		<div className={styles.container}>
			<Button
				className={styles.edit_icon_container}
				themeType="secondary"
				onClick={() => {
					setAddressIdxToUpdate(index);
					setMobalType(true);
				}}
			>
				<div>Edit</div>
				<IcMEdit height={14} width={14} style={{ marginLeft: '3px' }} />
			</Button>

			<div className={styles.basic_billing_details}>
				<div className={styles.billing_party_name_container}>
					<div className={styles.value_text}>Billing Party Name</div>
					<div className={styles.label_text}>{address.name || '-'}</div>
				</div>

				<div className={styles.mobile_sub_container}>
					<div className={styles.value_text}>Is your address SEZ?</div>
					<div className={styles.label_text}>
						{address.is_sez ? 'Yes' : 'No'}
					</div>
				</div>
			</div>

			<div className={styles.tax_details_container}>
				<div className={styles.address_container}>
					<div className={styles.value_text}>Address</div>
					<div className={styles.label_text}>{address.address || '-'}</div>
				</div>
				<div className={styles.sub_container}>
					<div className={styles.value_text}>GST Number</div>
					<div className={styles.label_text}>{address.tax_number || '-'}</div>
				</div>
			</div>

			<div className={styles.tax_details_container}>
				<div className={styles.pin_code_container}>
					<div className={styles.value_text}>Pincode </div>
					<div className={styles.label_text}>{address.pincode || '-'}</div>
				</div>

				<div className={styles.address_container}>
					<div className={styles.value_text}>GST Proof</div>
					{address.tax_number_document_url ? (
						<div className={styles.doc_container}>
							<div className={styles.flex}>
								<IcMDocument style={{ marginRight: 8 }} />
								<div className={styles.doc_text}>{gstDocName}</div>
							</div>

							<div className={styles.flex}>
								<div
									className={styles.link_text}
									role="presentation"
									onClick={() => handleOpenDocument(address.tax_number_document_url)}
								>
									View
								</div>
							</div>
						</div>
					) : (
						<div className={styles.label_text}>-</div>
					)}
				</div>
			</div>

			{(organization_pocs || []).map((firstPoc) => (
				<div className={styles.poc_container}>
					<div
						className={styles.poc_edit_icon_container}
						onClick={() => {
							setShowPocModal('edit');
							setPocToUpdate(firstPoc);
						}}
						role="presentation"
					>
						<IcMEdit style={{ width: 12, height: 12 }} />
					</div>

					<div className={styles.poc_sub_container}>
						<div className={`${styles.value_text}${styles.poc_details}`}>
							POC`s Name
						</div>
						<div className={`${styles.label_text}${styles.poc_details}`}>
							{firstPoc?.name || '-'}
						</div>
					</div>

					<div className={styles.poc_sub_container}>
						<div className={`${styles.value_text}${styles.poc_details}`}>
							POC`s Mobile
						</div>
						<div className={`${styles.label_text}${styles.poc_details}`}>
							{firstPoc?.mobile_number
								? `${firstPoc?.mobile_country_code || ''} ${
									firstPoc?.mobile_number
								}`
								: '-'}
						</div>
					</div>

					<div className={styles.poc_sub_container}>
						<div className={`${styles.value_text}${styles.poc_details}`}>
							Email
							{' '}
						</div>
						<div className={`${styles.label_text}${styles.poc_details}`}>
							{firstPoc?.email || '-'}
						</div>
					</div>

					<div className={styles.poc_sub_container}>
						<div className={`${styles.value_text}${styles.poc_details}`}>
							Alternate Mobile
						</div>
						<div className={`${styles.label_text}${styles.poc_details}`}>
							{firstPoc?.alternate_mobile_number
								? `${firstPoc?.alternate_mobile_country_code || ''} ${
									firstPoc?.alternate_mobile_number
								}`
								: '-'}
						</div>
					</div>
				</div>
			))}

			<div className={styles.poc_footer}>
				<Button
					size="sm"
					themeType="secondary"
					className={styles.button}
					onClick={() => setShowPocModal('add')}
				>
					Add POC +
				</Button>
			</div>

			{!!showPocModal && (
				<Modal
					closeOnOuterClick={() => setShowPocModal(false)}
					show={showPocModal}
					onClose={() => setShowPocModal(false)}
					size="sm"
				>
					<AddEditPocDetails
						getOrganizationBillingAddress={getOrganizationBillingAddress}
						showPocModal={showPocModal}
						setShowPocModal={setShowPocModal}
						pocToUpdate={pocToUpdate}
						address_data={address}
						type="billing_address"
						refetch={getAddress}
					/>
				</Modal>
			)}
		</div>
	);
}

export default AddressCard;
