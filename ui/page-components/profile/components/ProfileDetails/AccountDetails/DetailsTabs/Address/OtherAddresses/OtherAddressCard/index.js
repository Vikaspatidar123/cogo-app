/* eslint-disable no-undef */
import { Modal, Button, cl } from '@cogoport/components';
import { IcMEdit, IcMDocument } from '@cogoport/icons-react';
import { useState } from 'react';

import AddEditPocDetails from '../../AddEditPocDetails';

import styles from './styles.module.css';

function OtherAddressCard({
	other_address_data = {},
	setOtherAddressObjToUpdate = () => {},
	// getOrganizationOtherAddresses,
	index = '',
	setMobalType,
	setEditOtherAddressKey,
	address_key,
	getAdd,
}) {
	const [showPocModal, setShowPocModal] = useState(null);

	const [pocToUpdate, setPocToUpdate] = useState({});

	const { organization_pocs = [] } = other_address_data;

	const taxExemptionDocName = other_address_data.tax_exemption_proof
		?.split('/')
		?.pop();

	const handleOpenDocument = (url) => {
		let modifiedUrl = `https://${url}`;
		if (url?.includes('http://') || url?.includes('https://')) {
			modifiedUrl = url;
		}
		window.open(modifiedUrl, '_blank');
	};
	return (
		<div className={styles.container}>
			<div className={styles.edit_icon_container}>
				<Button
					themeType="secondary"
					onClick={() => {
						setOtherAddressObjToUpdate({
							address_type: other_address_data.address_type,
							index,
						});
						setMobalType(true);
						setEditOtherAddressKey(address_key);
					}}
				>
					<div>Edit</div>
					<IcMEdit style={{ height: 14, width: 14, marginLeft: '3px' }} />
				</Button>
			</div>

			<div className={styles.basic_billing_details}>
				<div className={styles.sub_container}>
					<div className={styles.label_text}>Billing Party Name</div>
					<div className={styles.value_text}>
						{other_address_data.name || '-'}
					</div>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.label_text}>Pincode</div>
					<div className={styles.value_text}>
						{other_address_data.pincode || '-'}
					</div>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.label_text}>Address</div>
					<div className={styles.value_text}>
						{other_address_data.address || '-'}
					</div>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.label_text}>Country</div>
					<div className={styles.value_text}>
						{other_address_data.country.name || '-'}
					</div>
				</div>
			</div>

			{other_address_data.tax_exemption_proof ? (
				<div className={styles.tax_details_container}>
					<div className={styles.sub_container}>
						<div className={styles.label_text}>Tax Exemption Proof</div>

						<div className={styles.doc_container}>
							<div className={styles.flex}>
								<IcMDocument style={{ marginRight: 8 }} />
								<div className={styles.doc_text}>{taxExemptionDocName}</div>
							</div>

							<div className={styles.flex}>
								<div
									className={styles.link_text}
									onClick={() => handleOpenDocument(other_address_data.tax_exemption_proof)}
									role="presentation"
								>
									view
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}

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
						<IcMEdit style={{ width: 16, height: 16 }} />
					</div>

					<div className={styles.poc_sub_container}>
						<div className={cl`${styles.label_text} ${styles.poc_details}`}>
							POC Name
						</div>
						<div className={`${styles.value_text}${styles.poc_details} `}>
							{firstPoc?.name || '-'}
						</div>
					</div>

					<div className={styles.poc_sub_container}>
						<div className={cl`${styles.label_text} ${styles.poc_details}`}>
							POC Mobile
						</div>
						<div className={`${styles.value_text} ${styles.poc_details} `}>
							{firstPoc?.mobile_number
								? `${firstPoc?.mobile_country_code || ''} ${
									firstPoc?.mobile_number
								}`
								: '-'}
						</div>
					</div>

					<div className={styles.poc_sub_container}>
						<div className={`${styles.label_text} ${styles.poc_details} `}>
							Email
						</div>
						<div className={`${styles.value_text} ${styles.poc_details}`}>
							{firstPoc?.email || '-'}
						</div>
					</div>
					<div className={styles.poc_sub_container}>
						<div className={`${styles.label_text} ${styles.poc_details} `}>
							Alternate Mobile
						</div>
						<div className={`${styles.value_text} ${styles.poc_details}`}>
							{firstPoc?.alternate_mobile_number
								? `${firstPoc?.alternate_mobile_country_code || ''}
												${firstPoc?.alternate_mobile_number}`
								: '-'}
						</div>
					</div>
				</div>
			))}

			<div className={styles.poc_footer}>

				<Button
					style={{
						marginLeft: 0,
					}}
					onClick={() => {
						setShowPocModal('add');
					}}
					size="sm"
					themeType="secondary"
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
						showPocModal={showPocModal}
						setShowPocModal={setShowPocModal}
						pocToUpdate={pocToUpdate}
						address_data={other_address_data}
						type="other_address"
						refetch={getAdd}
					/>
				</Modal>
			)}
		</div>
	);
}

export default OtherAddressCard;
