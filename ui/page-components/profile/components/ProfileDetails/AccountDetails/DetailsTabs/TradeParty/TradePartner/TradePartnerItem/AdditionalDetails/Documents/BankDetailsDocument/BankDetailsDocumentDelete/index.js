import { Modal, Button } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useDeleteDocument from '../../hooks/useDeleteDocument';

import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function BankDetailsDocumentDelete(props) {
	const { data, onCloseModal, showModal } = props;

	const { handleUpdateBankDetails, loading } = useDeleteDocument(props);

	const {
		general: { isMobile },
	} = useSelector((state) => state);

	const { t } = useTranslation(['profile']);
	const translationKey =		'profile:accountDetails.tabOptions.tradeParty.tradePartner.tradePartnerItem.additionalDetails.documents.bankDetailsDocument.bankDetailsDocumentDelete.';

	return (
		<Modal
			show={showModal}
			onClose={onCloseModal}
			styles={{
				dialog: {
					paddingTop    : 40,
					paddingBottom : 0,
					position      : !isMobile && 'relative',
				},
			}}
			closeOnOuterClick={onCloseModal}
		>
			<div className={styles.container}>
				<div className={styles.heading}>
					{data.status === 'active' ? 'De-activate' : 'Activate'}
					{t(`${translationKey}heading`)}
				</div>

				<div className={styles.sub_text}>
					{t(`${translationKey}subText.1`)}
					{' '}
					{data.status === 'active' ? 'de-activate' : 'activate'}
					{' '}
					{t(`${translationKey}subText.2`)}
					{t(`${translationKey}subText.3`)}
				</div>

				<div className={styles.button_container}>
					<Button
						disabled={loading}
						themeType="tertiary"
						onClick={() => onCloseModal()}
						style={{ marginRight: 12 }}
					>
						{t(`${translationKey}buttons.cancel`)}
					</Button>
					<Button
						disabled={loading}
						onClick={handleUpdateBankDetails}
						themeType="primary"
					>
						{data.status === 'active'
							? t(`${translationKey}buttons.deactivate`)
							: t(`${translationKey}buttons.activate`)}
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default BankDetailsDocumentDelete;
