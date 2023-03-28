import { Placeholder } from '@cogoport/components';

import InvoicingParties from '../InvoicingParties';
import NotifyParty from '../NotifyParty';
import PocDetails from '../PocDetails';

function StakeHolderPocDetails({
	tradeParties,
	tradePartyFilters,
	isOkam,
	utilities,
	setUtilities = () => {},
	listShipmentTradePartners = () => {},
	showAll,
	shipment_data,
	isIE = false,
	tradePartyLoading = false,
	tradePartnerData,
	final_stakeholders,
	not_added_final_stakeholders,
}) {
	return (
		<>
			{!tradePartyLoading ? (
				(tradeParties || []).map((stakeholder) => {
					if (
						stakeholder?.importer_exporter_pocs
						|| stakeholder?.service_provider_pocs
						|| [
							'self_notifying_party',
							'shipper_notifying_party',
							'consignee_notifying_party',
						].includes(stakeholder?.trade_party_type)
					) {
						return null;
					}

					return (
						<PocDetails
							tradeParties={tradeParties}
							stakeholder={stakeholder}
							tradePartyFilters={tradePartyFilters}
							isOkam={isOkam}
							showAll={showAll}
							setUtilities={setUtilities}
							utilities={utilities}
							listShipmentTradePartners={listShipmentTradePartners}
							shipment_data={shipment_data}
							isIE={isIE}
							final_stakeholders={final_stakeholders}
							not_added_final_stakeholders={not_added_final_stakeholders}
						/>
					);
				})
			) : (
				<Placeholder />
			)}

			{!tradePartyLoading ? (
				<NotifyParty
					tradePartnerData={tradePartnerData}
					listShipmentTradePartners={listShipmentTradePartners}
				/>
			) : (
				<Placeholder />
			)}

			{!tradePartyLoading ? (
				<InvoicingParties
					tradePartnerData={tradePartnerData}
					tradePartyFilters={tradePartyFilters}
				/>
			) : (
				<Placeholder />
			)}
		</>
	);
}

export default StakeHolderPocDetails;
