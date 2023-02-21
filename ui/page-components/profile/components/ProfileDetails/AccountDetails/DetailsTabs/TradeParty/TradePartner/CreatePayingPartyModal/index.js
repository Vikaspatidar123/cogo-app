import { Modal } from '@cogoport/components';

import { useSelector } from '@/packages/store';
import CreateNewInvoicingParty from '@/ui/commons/components/AddInvoicingParty/CreateNewInvoicingParty';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {Object} 	[tradePartyType]
 * @property {string} 	[activeTab]
 * @property {boolean} 	[showModal]
 * @property {function} [setShowModal]
 * @property {function} [getTradePartnerList]
 * @property {Object} 	[editTradePartnerItem]
 * @property {function} [setEditTradePartnerItem]
 */
function CreatePayingPartyModal(props) {
	const {
		orgResponse,
		tradePartyType,
		showModal,
		setShowModal,
		getTradePartnerList,
		source,
	} = props;

	const {
		general: { isMobile },
	} = useSelector((state) => state);

	if (!showModal) {
		return null;
	}

	return (
		<Modal
			show={showModal}
			onClose={() => setShowModal(false)}
			position={isMobile ? 'bottom' : ''}
			fullscreen={isMobile}
			className={`primary ${isMobile ? '' : 'xl'}`}
			styles={{
				dialog: {
					...(!isMobile && { width: '700px' }),
					height        : !isMobile && '500px',
					paddingTop    : 40,
					paddingBottom : 0,
					position      : !isMobile && 'relative',
				},
			}}
			onOuterClick={() => setShowModal(false)}
		>
			<CreateNewInvoicingParty
				orgResponse={orgResponse}
				tradePartyType={tradePartyType}
				setShowModal={setShowModal}
				fetchOrganizationTradeParties={getTradePartnerList}
				source={source}
			/>
		</Modal>
	);
}

export default CreatePayingPartyModal;
