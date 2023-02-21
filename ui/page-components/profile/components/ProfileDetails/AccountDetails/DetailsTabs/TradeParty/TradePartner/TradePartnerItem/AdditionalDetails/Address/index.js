import { Button } from '@cogoport/components';

import AddressList from '../../../../AddressList';

import styles from './styles.module.css';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {object} 	[tradePartyType]
 * @property {string} 	[activeTab]
 * @property {Object} 	[tradePartyData]
 * @property {string} 	[addressType]
 * @property {boolean} 	[showModal]
 * @property {function} [setShowModal]
 * @property {string} 	[countryId]
 */
function Address(props) {
	const {
		orgResponse,
		tradePartyType,
		tradePartyData,
		addressType,
		activeTab,
		showModal,
		setShowModal,
		countryId,
	} = props;

	const ADDRESS_MAPPING = {
		billingAddress: {
			title      : 'Billing Address',
			buttonText : 'Add Billing Address',
		},
		otherAddress: {
			title      : 'Other Address',
			buttonText : 'Other Address',
		},
	};

	const { id: organizationId = '' } = orgResponse;

	return (
		<div
			className={`${styles.flex_container} ${styles.direction}`}
			direction="column"
		>
			<div className={`${styles.flex_container} ${styles.flex_content}`}>
				<div className={styles.header_text}>
					{ADDRESS_MAPPING[addressType].title}
				</div>

				<Button
					themeType="accent"
					type="button"
					size="sm"
					onClick={() => setShowModal(true)}
				>
					{ADDRESS_MAPPING[addressType].buttonText}
				</Button>
			</div>

			<AddressList
				addressType={addressType}
				organizationId={organizationId}
				tradePartyData={tradePartyData}
				tradePartyType={tradePartyType}
				activeTab={activeTab}
				showModal={showModal}
				setShowModal={setShowModal}
				countryId={countryId}
			/>
		</div>
	);
}

export default Address;
