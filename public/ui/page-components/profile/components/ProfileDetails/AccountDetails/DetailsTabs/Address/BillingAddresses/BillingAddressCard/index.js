import { Modal, Button } from '@cogoport/components';
import { IcMDocument, IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddEditPocDetails from '../../AddEditPocDetails';

import PocCard from './PocCard';
import styles from './styles.module.css';

import getGeoConstants from '@/ui/commons/constants/geo';
import getValue from '@/ui/commons/utils/getValue';

function AddressCard({
	getOrganizationBillingAddress = {},
	address,
	setAddressIdxToUpdate = () => {},
	index,
	setMobalType,
	getAddress,
}) {
	const { organization_pocs = [] } = address;

	const { t } = useTranslation(['settings']);

	const [showPocModal, setShowPocModal] = useState(null);

	const [pocToUpdate, setPocToUpdate] = useState({});

	const geo = getGeoConstants();

	const REGISTRATION_LABEL = geo.others.registration_number.label;

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

	return (
		<div className={styles.container}>
			<Button
				className={styles.edit_icon_container}
				themeType="secondary"
				onClick={() => {
					setAddressIdxToUpdate(index);
					setMobalType(true);
				}}
				type="button"
			>
				<div>{t('settings:edit_or_add_button_label_2')}</div>
				<IcMEdit height={14} width={14} style={{ marginLeft: '3px' }} />
			</Button>

			<div className={styles.basic_billing_details}>
				<div className={styles.billing_party_name_container}>
					<div className={styles.value_text}>{t('settings:billing_details_label_1')}</div>
					<div className={styles.label_text}>{address.name || '-'}</div>
				</div>

				<div className={styles.mobile_sub_container}>
					<div className={styles.value_text}>{t('settings:billing_details_label_2')}</div>
					<div className={styles.label_text}>
						{address.is_sez ? 'Yes' : 'No'}
					</div>
				</div>
			</div>

			<div className={styles.tax_details_container}>
				<div className={styles.address_container}>
					<div className={styles.value_text}>{t('settings:billing_details_label_3')}</div>
					<div className={styles.label_text}>{address.address || '-'}</div>
				</div>
				<div className={styles.sub_container}>
					<div className={styles.value_text}>
						{REGISTRATION_LABEL}
						{' '}
						{t('settings:billing_details_label_4')}
					</div>
					<div className={styles.label_text}>{address.tax_number || '-'}</div>
				</div>
			</div>

			<div className={styles.tax_details_container}>
				<div className={styles.pin_code_container}>
					<div className={styles.value_text}>
						{t('settings:billing_details_label_5')}
					</div>
					<div className={styles.label_text}>{address.pincode || '-'}</div>
				</div>

				<div className={styles.address_container}>
					<div className={styles.value_text}>
						{REGISTRATION_LABEL}
						{' '}
						{t('settings:billing_details_label_6')}
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
									role="presentation"
									onClick={() => handleOpenDocument(address.tax_number_document_url)}
								>
									{t('settings:billing_details_button_label')}
								</div>
							</div>
						</div>
					) : (
						<div className={styles.label_text}>-</div>
					)}
				</div>
			</div>

			{(organization_pocs || []).map((firstPoc) => (
				<PocCard
					firstPoc={firstPoc}
					setShowPocModal={setShowPocModal}
					setPocToUpdate={setPocToUpdate}
					key={firstPoc.name}
				/>
			))}

			<div className={styles.poc_footer}>
				<Button
					size="sm"
					themeType="secondary"
					className={styles.button}
					onClick={() => setShowPocModal('add')}
					type="button"
				>
					{t('settings:add_poc_button_label')}
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
