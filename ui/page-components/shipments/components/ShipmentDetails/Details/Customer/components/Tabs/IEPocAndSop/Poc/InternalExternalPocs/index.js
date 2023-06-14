import { Placeholder, Toggle } from '@cogoport/components';
import { useState } from 'react';

import ExternalPocs from './ExternalPocs';
import InternalPocs from './InternalPocs';
import styles from './styles.module.css';

import useGetShipmentInternalStakeHolders from
	'@/ui/page-components/shipments/components/ShipmentDetails/hooks/useGetShipmentInternalStakeHolders';

function InternalExternalPocs({
	shipment_id = '',
	setUtilities = () => {},
	utilities,
	tradePartyFilters,
	listShipmentTradePartners = () => {},
	shipment_data,
	tradePartnerData,
	isOkam = false,
}) {
	const {
		internalStakeHoldersList,
		loading: internalStakeHoldersLoading,
		stakeholderListRefetch,
	} = useGetShipmentInternalStakeHolders({ shipment_id });

	const [internalExternalPoc, setInternalExternalPoc] = useState('internal');

	if (internalStakeHoldersLoading) {
		return <Placeholder />;
	}

	return (
		<div className={`${styles.details_container} ${styles.poc_details_header}`}>
			<div className={`${styles.poc_headers} ${styles.poc_header}`}>POCs</div>

			<div className={styles.toggle_container}>
				<Toggle
					name="toggle"
					onLabel="External"
					offLabel="Internal"
					disabled={false}
					value={internalExternalPoc}
					onChange={(e) => setInternalExternalPoc(e.target.checked ? 'external' : 'internal')}
				/>
			</div>

			{internalExternalPoc === 'internal' ? (
				<InternalPocs
					internalStakeHoldersList={internalStakeHoldersList}
					stakeholderListRefetch={stakeholderListRefetch}
					internalStakeHoldersLoading={internalStakeHoldersLoading}
					shipment_data={shipment_data}
				/>
			) : (
				<ExternalPocs
					shipment_data={shipment_data}
					tradePartyFilters={tradePartyFilters}
					tradePartnerData={tradePartnerData}
					isOkam={isOkam}
					setUtilities={setUtilities}
					utilities={utilities}
					listShipmentTradePartners={listShipmentTradePartners}
				/>
			)}
		</div>
	);
}

export default InternalExternalPocs;
