import { Placeholder, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import AddCompany from './AddCompany';
import AddCpDetails from './AddCpDetails';
import AddDetailContainer from './AddDetailContainer';
import InternalExternalPocs from './InternalExternalPocs';
import PocFilters from './PocFilters';
import PocServProvDetails from './PocServProvDetails';
import StakeHolderPocDetails from './StakeHolderPocDetails';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import { ShipmentDetailContext } from '@/ui/page-components/shipments/components/ShipmentDetails/common/Context';
import useGetPocData from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useGetPocData';
import useListShipTradePartners from
	'@/ui/page-components/shipments/components/ShipmentDetails/hooks/useListShipTradePartners';

function Poc() {
	const { scope } = useSelector(({ general }) => ({ scope: general?.scope }));
	const [{ shipment_data }] = useContext(ShipmentDetailContext);
	const shipment_id = shipment_data?.id;

	const {
		loading: tradePartyLoading,
		filters: tradePartyFilters,
		list: { data: tradeParties },
		hookSetters: tradePartiesHookSetters,
		refetch: listShipmentTradePartners,
		tradePartnerData,
	} = useListShipTradePartners({ shipment_data });

	const bookingPartyData = tradePartnerData?.list?.find(
		(item) => item?.trade_party_type === 'self',
	);

	const {
		showAll,
		isOkam,
		final_stakeholders,
		formRef,
		onClose,
		utilities,
		setUtilities,
		filterCPServices,
		service_prov_ids,
		service_providers,
		not_added_service_providers,
		listServiceRefetch,
		serviceListLoading,
		not_added_final_stakeholders,
	} = useGetPocData({
		tradeParties,
		shipment_data,
		scope,
		shipment_id,
	});

	const stakeHolderDetails = () => (!tradePartyLoading ? (
		(final_stakeholders || [])?.map((stakeholder) => (
			<AddDetailContainer
				stakeholder={stakeholder}
				setUtilities={setUtilities}
				utilities={utilities}
				okamCheck={isOkam}
				showAll={showAll}
			/>
		))
	) : (
		<Placeholder />
	));

	const stakeHolderPOCDetails = () => (
		<StakeHolderPocDetails
			tradePartyFilters={tradePartyFilters}
			tradePartnerData={tradePartnerData}
			tradeParties={tradeParties}
			isOkam={isOkam}
			showAll={showAll}
			setUtilities={setUtilities}
			utilities={utilities}
			listShipmentTradePartners={listShipmentTradePartners}
			shipment_data={shipment_data}
			tradePartyLoading={tradePartyLoading}
			final_stakeholders={final_stakeholders}
			not_added_final_stakeholders={not_added_final_stakeholders}
		/>
	);

	const serviceProviderDetails = () => (!serviceListLoading ? (
		not_added_service_providers.map((sp) => {
			if (sp !== undefined) {
				return (
					<AddCpDetails
						service_provider={sp}
						setUtilities={setUtilities}
						utilities={utilities}
					/>
				);
			}
			return null;
		})
	) : (
		<Placeholder />
	));

	const serviceProviderPOCDetails = () => {
		const condition = !isEmpty(tradePartyFilters?.trade_partner)
			&& tradePartyFilters?.trade_partner !== 'collection_party';

		return condition
			? null
			: (service_providers || []).map((item, index) => (
				<PocServProvDetails
					service_providers={service_providers}
					location={tradePartyFilters?.origin_location_id}
					workScopes={tradePartyFilters?.designation}
					tradePartyFilters={tradePartyFilters}
					businessName={utilities?.businessName}
					servProvId={utilities?.servProvId}
					item={item}
					tradePartnerData={tradePartnerData}
					index={index}
					listShipmentTradePartners={listShipmentTradePartners}
					setUtilities={setUtilities}
					utilities={utilities}
				/>
			));
	};

	const renderPOC = () => {
		if (isOkam) {
			return (
				<div className={styles.scope}>
					{stakeHolderDetails()}

					{scope === 'partner' ? (
						<InternalExternalPocs
							shipment_id={shipment_id}
							shipment_data={shipment_data}
							tradePartyFilters={tradePartyFilters}
							tradePartnerData={tradePartnerData}
							isOkam={isOkam}
							setUtilities={setUtilities}
							utilities={utilities}
							listShipmentTradePartners={listShipmentTradePartners}
						/>
					) : null}

					{!tradePartyLoading ? stakeHolderPOCDetails() : <Placeholder />}
				</div>
			);
		}
		return (
			<div className={styles.scope}>
				{stakeHolderDetails()}

				{serviceProviderDetails()}

				<InternalExternalPocs
					shipment_id={shipment_id}
					shipment_data={shipment_data}
					tradePartyFilters={tradePartyFilters}
					tradePartnerData={tradePartnerData}
					isOkam={isOkam}
					setUtilities={setUtilities}
					utilities={utilities}
					listShipmentTradePartners={listShipmentTradePartners}
				/>

				{!tradePartyLoading ? stakeHolderPOCDetails() : <Placeholder />}

				{!serviceListLoading ? serviceProviderPOCDetails() : <Placeholder />}
			</div>
		);
	};
	return (
		<div className={styles.container}>
			<PocFilters
				isOkam={isOkam}
				showAll={showAll}
				formRef={formRef}
				tradePartiesHookSetters={tradePartiesHookSetters}
				tradePartyFilters={tradePartyFilters}
				tradeParties={tradeParties}
				not_added_final_stakeholders={not_added_final_stakeholders}
				filterCPServices={filterCPServices}
			/>

			<div className={styles.line} />

			{renderPOC()}

			{utilities?.addCompanyModal ? (
				<Modal
					theme="admin"
					className="primary xl"
					show={utilities?.addCompanyModal}
					onClose={onClose}
					onOuterClick={onClose}
				>
					<AddCompany
						stakeholderOptions={not_added_final_stakeholders}
						listServiceRefetch={listServiceRefetch}
						service_prov_ids={service_prov_ids}
						bookingPartyData={bookingPartyData}
						setUtilities={setUtilities}
						utilities={utilities}
						listShipmentTradePartners={listShipmentTradePartners}
					/>
				</Modal>
			) : null}
		</div>
	);
}

export default Poc;
