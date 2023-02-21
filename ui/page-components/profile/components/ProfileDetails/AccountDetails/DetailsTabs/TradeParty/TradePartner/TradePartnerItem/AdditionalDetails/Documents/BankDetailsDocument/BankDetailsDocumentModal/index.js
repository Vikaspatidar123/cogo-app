import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import BankDetailsDocumentDelete from '../BankDetailsDocumentDelete';
import BankDetailsDocumentForm from '../BankDetailsDocumentForm';

import { useSelector } from '@/packages/store';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {string} 	[tradePartyId]
 * @property {boolean} 	[showModal]
 * @property {function} [setShowModal]
 * @property {function} [getOrganizationDocuments]
 * @property {Object} 	[editBankDetailsDocumentItem]
 * @property {function} [setEditBankDetailsDocumentItem]
 */
function BankDetailsDocumentModal(props) {
	const {
		orgResponse,
		tradePartyId,
		showModal,
		setShowModal,
		getOrganizationDocuments,
		editBankDetailsDocumentItem,
		setEditBankDetailsDocumentItem,
	} = props;

	if (!showModal) {
		return null;
	}

	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const onCloseModal = () => {
		setShowModal(() => {
			if (!isEmpty(editBankDetailsDocumentItem)) {
				setEditBankDetailsDocumentItem({});
			}

			return false;
		});
	};

	if (!isEmpty(editBankDetailsDocumentItem)) {
		return (
			<BankDetailsDocumentDelete
				data={editBankDetailsDocumentItem}
				onCloseModal={onCloseModal}
				getOrganizationDocuments={getOrganizationDocuments}
				showModal={showModal}
			/>
		);
	}

	return (
		<Modal
			show={showModal}
			onClose={onCloseModal}
			position={isMobile ? 'bottom' : ''}
			fullscreen={isMobile}
			className={`primary ${isMobile ? '' : 'xl'}`}
			styles={{
				dialog: {
					...(!isMobile && { width: '700px' }),
					height        : !isMobile && '500px',
					paddingBottom : 0,
					position      : !isMobile && 'relative',
				},
			}}
			onOuterClick={onCloseModal}
		>
			<BankDetailsDocumentForm
				key={editBankDetailsDocumentItem?.document_type || showModal}
				orgResponse={orgResponse}
				tradePartyId={tradePartyId}
				getOrganizationDocuments={getOrganizationDocuments}
				data={editBankDetailsDocumentItem}
				onCloseModal={onCloseModal}
			/>
		</Modal>
	);
}

export default BankDetailsDocumentModal;
