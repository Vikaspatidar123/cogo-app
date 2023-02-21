import { Modal, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import { useSelector } from '@/packages/store';
import AddressForm from '@/ui/commons/components/AddressForm';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals.json';

const { IN } = GLOBAL_CONSTANTS.country_ids;

/**
 * @typedef  {Object} 	[props]
 * @property {string} 	[addressType]
 * @property {string} 	[organizationId]
 * @property {Object} 	[tradePartyData]
 * @property {Object} 	[tradePartyType]
 * @property {string} 	[activeTab]
 * @property {boolean} 	[showModal]
 * @property {function} [setShowModal]
 * @property {string} 	[getAddressesList]
 * @property {Object} 	[editAddressItem]
 * @property {function} [setEditAddressItem]
 */
function SaveAddressModal(props) {
	const {
		addressType,
		organizationId,
		tradePartyData,
		showModal,
		setShowModal,
		getAddressesList,
		editAddressItem,
		setEditAddressItem,
		countryId,
	} = props;

	if (!showModal) {
		return null;
	}

	const {
		general: { isMobile },
	} = useSelector((state) => state);

	const onCloseModal = () => {
		setShowModal(() => {
			if (!isEmpty(editAddressItem)) {
				setEditAddressItem({});
			}

			return false;
		});
	};

	const { id = '', registration_number: registrationNumber = '' } =		tradePartyData;

	return (
		<Modal
			show={showModal}
			onClose={onCloseModal}
			placement={isMobile ? 'bottom' : ''}
			size={!isMobile && 'md'}
			closeOnOuterClick={onCloseModal}
		>
			<AddressForm
				organizationId={organizationId}
				tradePartyId={id}
				isAddressRegisteredUnderGst={addressType === 'otherAddress'}
				addressData={editAddressItem}
				addressType={addressType}
				showInvoiceTradeParty={false}
				onSuccess={() => {
					getAddressesList();
					onCloseModal();
				}}
				onFailure={({ error }) => {
					Toast.error(error.data);
				}}
				saveAddressData
				showSavedPOC={false}
				submitButtonLabel="Submit"
				optionalButtons={[]}
				loading={false}
				formState={{}}
				registrationNumber={
					addressType === 'billingAddress' ? registrationNumber : ''
				}
				validateGst={countryId === IN}
			/>
		</Modal>
	);
}

export default SaveAddressModal;
