/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import { Modal, Button } from '@cogoport/components';
import { IcMEdit, IcMDocument } from '@cogoport/icons-react';
import { useState } from 'react';

import AddEditPocDetails from '../../AddEditPocDetails';

import styles from './styles.module.css';

function OtherAddressCard({
	other_address_data = {},
	setOtherAddressObjToUpdate = () => { },
	// getOrganizationOtherAddresses,
	index = '',
}) {
	const [showPocDetails, setShowPocDetails] = useState(false);

	const [showPocModal, setShowPocModal] = useState(null);

	const [pocToUpdate, setPocToUpdate] = useState({});

	const { organization_pocs = [] } = other_address_data;

	const [firstPoc, ...restPocs] = organization_pocs;

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
				<IcMEdit
					onClick={() => {
						setOtherAddressObjToUpdate({
							address_type: other_address_data.address_type,
							index,
						});
					}}
					style={{ height: 16, width: 16 }}
				/>
			</div>

			<div className={styles.basic_billing_details}>
				<div className={styles.sub_container}>
					<div className={styles.label_text}>
						Billing Party Name
					</div>
					<div className={styles.value_text}>{other_address_data.name || '-'}</div>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.label_text}>

						Pincode

					</div>
					<div className={styles.value_text}>{other_address_data.pincode || '-'}</div>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.label_text}>
						Address
					</div>
					<div className={styles.value_text}>{other_address_data.address || '-'}</div>
				</div>

				<div className={styles.sub_container}>
					<div className={styles.label_text}>
						Country

					</div>
					<div className={styles.value_text}>{other_address_data.country.name || '-'}</div>
				</div>
			</div>

			{
				other_address_data.tax_exemption_proof ? (
					<div className={styles.tax_details_container}>
						<div className={styles.sub_container}>
							<div className={styles.label_text}>
								Tax Exemption Proof
							</div>

							<div className={styles.doc_container}>
								<div className={styles.flex}>
									<IcMDocument style={{ marginRight: 8 }} />
									<div className={styles.doc_text}>{taxExemptionDocName}</div>
								</div>

								<div className={styles.flex}>
									<div
										className={styles.link_text}
										onClick={() => handleOpenDocument(other_address_data.tax_exemption_proof)}
									>
										view
									</div>
								</div>
							</div>
						</div>
					</div>
				) : null
			}

			{
				firstPoc ? (
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
							<div className={`${styles.label_text}${styles.poc_details} `}>
								Poc Name
							</div>
							<div className={`${styles.label_text}${styles.poc_details} `}>
								{firstPoc?.name || '-'}
							</div>
						</div>

						<div className={styles.poc_sub_container}>
							<div className={`${styles.label_text}${styles.poc_details} `}>
								Poc Mobile

							</div>
							<div className={`${styles.label_text}${styles.poc_details} `}>
								{firstPoc?.mobile_number
									? `${firstPoc?.mobile_country_code || ''} ${firstPoc?.mobile_number
									}`
									: '-'}
							</div>
						</div>

						<div className={styles.poc_sub_container}>
							<div className={`${styles.label_text}${styles.poc_details} `}>
								Email

							</div>
							<div className={`${styles.value_text}${styles.poc_details}`}>
								{firstPoc?.email || '-'}
							</div>
						</div>
						<div className={styles.poc_sub_container}>
							<div className={`${styles.label_text}${styles.poc_details} `}>
								Allternate Mobile

							</div>
							<div className={`${styles.value_text}${styles.poc_details}`}>
								{firstPoc?.alternate_mobile_number
									? `${firstPoc?.alternate_mobile_country_code || ''} ${firstPoc?.alternate_mobile_number
									}`
									: '-'}
							</div>
						</div>
					</div>
				) : null
			}

			{
				showPocDetails && restPocs.length
					? restPocs.map((poc_details) => (
						<div className={styles.poc_container}>
							<div
								className={styles.poc_edit_icon_container}
								onClick={() => {
									setShowPocModal('edit');
									setPocToUpdate(poc_details);
								}}
							>
								<IcMEdit style={{ width: 10, height: 10 }} />
							</div>

							<div className={styles.poc_sub_container}>
								<div className={`${styles.label_text}${styles.poc_details} `}>
									Pocs Name
								</div>
								<div className={`${styles.value_text}${styles.poc_details}`}>
									{poc_details?.name || '-'}
								</div>
							</div>

							<div className={styles.poc_sub_container}>
								<div className={`${styles.label_text}${styles.poc_details} `}>
									Pocs Mobile
								</div>
								<div className={`${styles.value_text}${styles.poc_details}`}>
									{poc_details?.mobile_number
										? `${poc_details?.mobile_country_code || ''} ${poc_details?.mobile_number
										}`
										: '-'}
								</div>
							</div>

							<div className={styles.poc_sub_container}>
								<div className={`${styles.label_text}${styles.poc_details} `}>
									Email
								</div>
								<div className={`${styles.value_text}${styles.poc_details}`}>
									{poc_details?.email || '-'}
								</div>
							</div>

							<div className={styles.poc_sub_container}>
								<div className={`${styles.label_text}${styles.poc_details} `}>
									Allternate Mobile
								</div>
								<div className={`${styles.value_text}${styles.poc_details}`}>
									{poc_details?.alternate_mobile_number
										? `${poc_details?.alternate_mobile_country_code || ''} ${poc_details?.alternate_mobile_number
										}`
										: '-'}
								</div>
							</div>
						</div>
					))
					: null
			}

			<div className={styles.poc_footer}>
				{organization_pocs.length > 1 ? (
					<div className={styles.link_text} onClick={() => setShowPocDetails(!showPocDetails)}>
						{`${showPocDetails
							? 'linkTexts.1'

							: 'card.pocFooter.linkTexts.2'

						} `}
					</div>
				) : null}

				<Button
					style={{
						marginLeft: 'auto',
					}}
					onClick={() => setShowPocModal('add')}
					size="sm"
					themeType="accent"
				>
					Add Poc

				</Button>
			</div>

			{
				!!showPocModal && (
					<Modal
						closeOnOuterClick={() => setShowPocModal(false)}
						show={showPocModal}
						onClose={() => setShowPocModal(false)}
						size="sm"
						// scroll
					>
						<AddEditPocDetails
							showPocModal={showPocModal}
							setShowPocModal={setShowPocModal}
							// getOrganizationOtherAddresses={getOrganizationOtherAddresses}
							pocToUpdate={pocToUpdate}
							address_data={other_address_data}
							type="other_address"
						/>
					</Modal>
				)
			}
		</div>
	);
}

export default OtherAddressCard;
