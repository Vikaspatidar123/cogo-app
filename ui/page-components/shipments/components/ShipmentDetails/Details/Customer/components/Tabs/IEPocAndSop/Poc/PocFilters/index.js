import { Popover } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import Cross from './cross';
import FilterContent from './FilterContent';
import styles from './styles.module.css';

import useGetLocationById from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useGetLocationById';
import useHandleFilters from '@/ui/page-components/shipments/components/ShipmentDetails/hooks/useHandleFilters';

function PocFilters({
	isOkam,
	showAll,
	formRef,
	tradePartiesHookSetters,
	tradePartyFilters,
	tradeParties,
	filterCPServices,
	not_added_final_stakeholders,
}) {
	const [showFilter, setShowFilters] = useState(false);

	const {
		handleDesnFilters = () => {},
		handleFilters = () => {},
		handleLocationFilter = () => {},
	} = useHandleFilters({
		tradePartiesHookSetters,
		tradePartyFilters,
		formRef,
	});

	const id = tradePartyFilters?.origin_location_id;
	const { data, loading } = useGetLocationById(id);

	const content = () => (
		<FilterContent
			setShowFilters={setShowFilters}
			showFilter={showFilter}
			filterCPServices={filterCPServices}
			isOkam={isOkam}
			showAll={showAll}
			ref={formRef}
			tradePartiesHookSetters={tradePartiesHookSetters}
			tradePartyFilters={tradePartyFilters}
			tradeParties={tradeParties}
			not_added_final_stakeholders={not_added_final_stakeholders}
		/>
	);

	return (
		<div className={styles.filter_container}>
			<Popover
				content={content()}
				placement="bottom"
				interactive
				visible={showFilter}
				onClickOutside={() => setShowFilters(false)}
			>
				<div
					role="presentation"
					className={styles.filter_button}
					onClick={() => setShowFilters(!showFilter)}
				>
					<IcMFilter />
				</div>
			</Popover>

			<div className={styles.filters}>
				{tradePartyFilters?.trade_partner ? (
					<div
						role="presentation"
						className={styles.filterbg}
						onClick={handleFilters}
					>
						{tradePartyFilters?.trade_partner !== 'booking_party'
						&& tradePartyFilters?.trade_partner !== 'invoicing_parties' ? (
								(tradeParties || []).map((item) => {
									if (item?.id === tradePartyFilters?.trade_partner) {
										return (
											<div className={styles.filter_text}>
												{`${startCase(item?.trade_party_type)} ( ${startCase(
													item?.trade_partner_details?.business_name,
												)} ) `}
												<Cross />
											</div>
										);
									}
									return null;
								})
							) : (
								<div className={styles.filter_text}>
									{tradePartyFilters?.trade_partner === 'booking_party'
										? 'Booking Party'
										: 'Invoicing Parties'}
									<Cross />
								</div>
							)}
					</div>
				) : null}

				{tradePartyFilters?.designation
					? (tradePartyFilters?.designation || []).map((item) => (
						<div
							role="presentation"
							className={styles.filterbg}
							onClick={() => {
								handleDesnFilters(item);
							}}
						>
							<div className={styles.filter_text}>
								{startCase(item.replace(/_/g, ' '))}
								<Cross />
							</div>
						</div>
					))
					: null}

				{tradePartyFilters?.origin_location_id ? (
					<div>
						{!loading ? (
							<div
								role="presentation"
								className={styles.filterbg}
								onClick={handleLocationFilter}
							>
								<div className={styles.filter_text}>
									{data?.list?.[0]?.name}
									<Cross />
								</div>
							</div>
						) : null}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default PocFilters;
