import { Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import OthersDocumentForm from '../OthersDocumentForm';

import { useSelector } from '@/packages/store';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {string} 	[tradePartyId]
 * @property {boolean} 	[showModal]
 * @property {function} [setShowModal]
 * @property {function} [getOrganizationDocuments]
 * @property {Object} 	[editOthersDocumentItem]
 * @property {function} [setEditOthersDocumentItem]
 */
function OthersDocumentModal(props) {
	const {
		orgResponse,
		tradePartyId,
		showModal,
		setShowModal,
		getOrganizationDocuments,
		editOthersDocumentItem,
		setEditOthersDocumentItem,
	} = props;

	if (!showModal) {
		return null;
	}

	const {
		general: { isMobile = false },
	} = useSelector((state) => state);

	const onCloseModal = () => {
		setShowModal(() => {
			if (!isEmpty(editOthersDocumentItem)) {
				setEditOthersDocumentItem({});
			}

			return false;
		});
	};

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
			<OthersDocumentForm
				key={editOthersDocumentItem.document_type || showModal}
				orgResponse={orgResponse}
				tradePartyId={tradePartyId}
				getOrganizationDocuments={getOrganizationDocuments}
				data={editOthersDocumentItem}
				onCloseModal={onCloseModal}
			/>
		</Modal>
	);
}

export default OthersDocumentModal;
