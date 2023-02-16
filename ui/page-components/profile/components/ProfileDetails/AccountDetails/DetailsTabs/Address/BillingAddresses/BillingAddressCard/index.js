import { Modal, Button } from '@cogoport/components';
import { IcMDocument, IcMEdit } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import AddEditPocDetails from '../../AddEditPocDetails';

import styles from './styles.module.css';

import getValue from '@/commons/utils/getValue';
import { useSelector } from '@/packages/store';

function AddressCard({
	getOrganizationBillingAddress,
	address,
	setAddressIdxToUpdate = () => { },
	index,
}) {
	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const { t } = useTranslation(['profile']);

	const [showPocDetails, setShowPocDetails] = useState(false);

	const [showPocModal, setShowPocModal] = useState(null);

	const [pocToUpdate, setPocToUpdate] = useState({});

	const gstDocName = getValue(address, 'tax_number_document_url', '')
		.split('/')
		.pop();
	const sezDocName = getValue(address, 'sez_proof', '').split('/').pop();

	const handleOpenDocument = (url) => {
		let modifiedUrl = `https://${url}`;
		if (url?.includes('http://') || url?.includes('https://')) {
			modifiedUrl = url;
		}
		window.open(modifiedUrl, '_blank');
	};

	const { organization_pocs = [] } = address;

	const [firstPoc, ...restPocs] = organization_pocs;

	return (
		<div className={styles.container}>
			<div className={styles.edit_icon_container} onClick={() => setAddressIdxToUpdate(index)}>
				<IcMEdit style={{ height: 16, width: 16 }} />
			</div>

			<div className={styles.basic_billing_details}>
				<div className={styles.billing_party_name_container}>
					<div className={styles.label_text}>
						{t(
							'profile:accountDetails.tabOptions.address.billingAddress.card.billingPartyName',
						)}
						{' '}
					</div>
					<div className={styles.value_text}>{address.name || '-'}</div>
				</div>

				<div className={styles.address_container}>
					<div className={styles.label_text}>
						{t(
							'profile:accountDetails.tabOptions.address.billingAddress.card.address',
						)}
						{' '}
					</div>
					<div className={styles.value_text}>{address.address || '-'}</div>
				</div>

				<div className={styles.pin_code_container}>
					<div className={styles.label_text}>
						{t(
							'profile:accountDetails.tabOptions.address.billingAddress.card.pincode',
						)}
						{' '}
					</div>
					<div className={styles.value_text}>{address.pincode || '-'}</div>
				</div>
			</div>

			<div className={styles.tax_details_container}>
				<div className={styles.sub_container}>
					<div className={styles.label_text}>
						{t(
							'profile:accountDetails.tabOptions.address.billingAddress.card.gst.gstNumber',
						)}
						{' '}
					</div>
					<div className={styles.value_text}>{address.tax_number || '-'}</div>
				</div>

				<div className={styles.address_container}>
					<div className={styles.label_text}>
						billingAddress
					</div>

					{address.tax_number_document_url ? (
						<div className={styles.doc_container}>
							<div className={styles.flex}>
								<IcMDocument style={{ marginRight: 8 }} />
								<div className={styles.doc_text}>{gstDocName}</div>
							</div>

							<div className={styles.flex}>
								<div
									className={styles.link_text}
									onClick={() => handleOpenDocument(address.tax_number_document_url)}
								>
									gst

								</div>
							</div>
						</div>
					) : (
						<div className={styles.value_text}>-</div>
					)}
				</div>
			</div>

			<div className={styles.flex}>
				{!isMobile ? (
					<div className={styles.sub_container}>
						<div className={styles.label_text}>
							isSez
						</div>
						<div className={styles.value_text}>
							{address.is_sez
								? 'address'
								: 'sez'}
						</div>
					</div>
				) : null}

				{address.sez_proof ? (
					<div className={styles.address_container}>
						<div className={styles.label_text}>
							billingAddress
						</div>
						<div className={styles.doc_container}>
							<div className={styles.flex}>
								<IcMDocument style={{ marginRight: 8 }} />
								<div className={styles.doc_text}>{sezDocName}</div>
							</div>

							<div className={styles.flex}>
								<div className={styles.link_text} onClick={() => handleOpenDocument(address.sez_proof)}>
									view
								</div>
							</div>
						</div>
					</div>
				) : null}
			</div>

			{firstPoc ? (
				<div className={styles.poc_container}>
					<div
						className={styles.poc_edit_icon_container}
						onClick={() => {
							setShowPocModal('edit');
							setPocToUpdate(firstPoc);
						}}
					>
						<IcMEdit style={{ width: 12, height: 12 }} />
					</div>

					<div className={styles.poc_sub_container}>
						<div className={`${styles.label_text}${styles.poc_details}`}>
							firstPoc
						</div>
						<div className={`${styles.value_text}${styles.poc_details}`}>
							{firstPoc?.name || '-'}
						</div>
					</div>

					<div className={styles.poc_sub_container}>
						<div className={`${styles.label_text}${styles.poc_details}`}>
							mobile
						</div>
						<div className={`${styles.label_text}${styles.poc_details}`}>
							{firstPoc?.mobile_number
								? `${firstPoc?.mobile_country_code || ''} ${firstPoc?.mobile_number
								}`
								: '-'}
						</div>
					</div>

					<div className={styles.poc_sub_container}>
						<div className={`${styles.label_text}${styles.poc_details}`}>
							email
							{' '}
						</div>
						<div className={`${styles.label_text}${styles.poc_details}`}>
							{firstPoc?.email || '-'}
						</div>
					</div>

					<div className={styles.poc_sub_container}>
						<div className={`${styles.label_text}${styles.poc_details}`}>
							allternateMobile
						</div>
						<div className={`${styles.label_text}${styles.poc_details}`}>
							{firstPoc?.alternate_mobile_number
								? `${firstPoc?.alternate_mobile_country_code || ''} ${firstPoc?.alternate_mobile_number
								}`
								: '-'}
						</div>
					</div>
				</div>
			) : null}

			{showPocDetails && restPocs.length
				? restPocs.map((poc_details) => (
					<div className={styles.poc_container}>
						<div
							className={styles.poc_edit_icon_container}
							onClick={() => {
								setShowPocModal('edit');
								setPocToUpdate(poc_details);
							}}
						>
							<IcMEdit style={{ width: 12, height: 12 }} />
						</div>

						<div className={styles.poc_sub_container}>
							<div className={`${styles.label_text}${styles.poc_details}`}>
								name
							</div>
							<div className={`${styles.label_text}${styles.poc_details}`}>
								{poc_details?.name || '-'}
							</div>
						</div>

						<div className={styles.poc_sub_container}>
							<div className={`${styles.label_text}${styles.poc_details}`}>
								phone
							</div>
							<div className={`${styles.label_text}${styles.poc_details}`}>
								{poc_details?.mobile_number
									? `${poc_details?.mobile_country_code || ''} ${poc_details?.mobile_number
									}`
									: '-'}
							</div>
						</div>

						<div className={styles.poc_sub_container}>
							<div className={`${styles.label_text}${styles.poc_details}`}>
								email
							</div>
							<div className={`${styles.label_text}${styles.poc_details}`}>
								{poc_details?.email || '-'}
							</div>
						</div>

						<div className={styles.poc_sub_container}>
							<div className={`${styles.label_text}${styles.poc_details}`}>
								alternateMobile
							</div>
							<div className={`${styles.label_text}${styles.poc_details}`}>
								{poc_details?.alternate_mobile_number
									? `${poc_details?.alternate_mobile_country_code || ''} ${poc_details?.alternate_mobile_number
									}`
									: '-'}
							</div>
						</div>
					</div>
				))
				: null}

			<div className={styles.poc_footer}>
				{organization_pocs.length > 1 ? (
					<div className={styles.link_text} onClick={() => setShowPocDetails(!showPocDetails)}>
						{showPocDetails
							? 'linkTexts'

							: 'linkTexts'}
					</div>
				) : null}

				<Button
					className="primary sm"
					style={{
						marginLeft: 'auto',
					}}
					onClick={() => setShowPocModal('add')}
				>
					billingAddress
				</Button>
			</div>

			{!!showPocModal && (
				<Modal
					onOuterClick={() => setShowPocModal(false)}
					show={showPocModal}
					onClose={() => setShowPocModal(false)}
					styles={{ dialog: { width: isMobile && 'unset' } }}
				>
					<AddEditPocDetails
						getOrganizationBillingAddress={getOrganizationBillingAddress}
						showPocModal={showPocModal}
						setShowPocModal={setShowPocModal}
						pocToUpdate={pocToUpdate}
						address_data={address}
						type="billing_address"
					/>
				</Modal>
			)}
		</div>
	);
}

export default AddressCard;
