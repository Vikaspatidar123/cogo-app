import { TabPanel, Tabs } from '@cogoport/components';
import { useState } from 'react';

import Address from './Address';
import getConfig from './config';
import Documents from './Documents';
import styles from './styles.module.css';

const CONSTANTS = {
	COMPONENT_KEYS: {
		BILLING_ADDRESS       : 'billingAddress',
		OTHER_ADDRESS         : 'otherAddress',
		BANK_DETAILS_DOCUMENT : 'bankDetailsDocument',
		OTHER_DOCUMENTS       : 'otherDocuments',
	},
};

const TABS_PANEL_COMPONENT_MAPPING = {
	billingAddress      : Address,
	otherAddress        : Address,
	bankDetailsDocument : Documents,
	otherDocuments      : Documents,
};

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {Object} 	[tradePartyType]
 * @property {string} 	[activeTab]
 * @property {Object}   [data]
 */
function AdditionalDetails(props) {
	const {
		orgResponse,
		activeTab,
		tradePartyType,
		data: tradePartyData,
	} = props;

	const config = getConfig();

	const { tabs } = config;

	const tabOptions = Object.values(tabs);

	const [subActiveTab, setSubActiveTab] = useState(Object.keys(tabs)[0]);
	const [showModal, setShowModal] = useState(false);

	const isAddressesTab = [
		CONSTANTS.COMPONENT_KEYS.BILLING_ADDRESS,
		CONSTANTS.COMPONENT_KEYS.OTHER_ADDRESS,
	].includes(subActiveTab);

	const isDocumentsTab = [
		CONSTANTS.COMPONENT_KEYS.BANK_DETAILS_DOCUMENT,
		CONSTANTS.COMPONENT_KEYS.OTHER_DOCUMENTS,
	].includes(subActiveTab);

	const TabComponent = TABS_PANEL_COMPONENT_MAPPING[subActiveTab];

	const tabComponentProps = {
		orgResponse,
		tradePartyData,
		showModal,
		setShowModal,
		// tradePartyType,
		...(isAddressesTab && {
			addressType : subActiveTab,
			activeTab,
			countryId   : tradePartyData.country_id,
		}),
		...(isDocumentsTab ? { documentType: subActiveTab } : {}),
	};

	return (
		<div className={styles.tab_container}>
			<Tabs
				activeTab={subActiveTab}
				onChange={setSubActiveTab}
				themeType="secondary"
				fullWidth
			>
				{tabOptions.map((tabOption) => {
					const { name, title } = tabOption;

					return <TabPanel key={name} name={name} title={title} />;
				})}
			</Tabs>

			<div className={styles.tabs_panel_content}>
				{TabComponent && (
					<TabComponent key={subActiveTab} {...tabComponentProps} />
				)}
			</div>
		</div>
	);
}

export default AdditionalDetails;
