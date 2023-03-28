import TruckingTouchPoints from '@cogo/business-modules/components/TruckingTouchPoints';
import { IcCFtick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import ContractRateCard from '../ContractRateCard';
import HaulageText from '../RateCard/HaulageText';
import Promocode from '../RateCard/Promocode';
import Quotation from '../RateCard/Quotation';
import QuotationDetails from '../RateCard/QuotationDetails';
import Route from '../RateCard/Route';

import ContainerDetails from './ContainerDetails';
import styles from './styles.module.css';

const RATE_SOURCE_MAPPING = {
	spot_rates            : 'System Rate',
	spot_negotiation_rate : 'Enquiry Reverted Rate',
	predicted             : 'Predicted Rate',
	cogo_assured_rate     : 'Assured',
};

const detailsToShow = (data) => {
	const details = [
		{
			value:
				data?.destination_detention?.free_limit
				|| data?.destination_detention?.free_limit === 0
				|| data?.search_type === 'fcl_freight'
					? `${
						data?.destination_detention?.free_limit || 0
					} free detention days`
					: null,
		},
		{
			value:
				data?.destination_storage?.free_limit
				|| data?.destination_storage?.free_limit === 0
				|| ['air_freight', 'lcl_freight'].includes(data?.search_type)
					? `${data?.destination_storage?.free_limit || 0} free storage ${
						data?.search_type === 'air_freight' ? 'hours' : 'days'
					}`
					: null,
		},
	];

	return details
		.map((item) => (item?.value ? (
			<div style={{ alignItems: 'center', display: 'flex', width: '40%', margin: '4px' }}>
				<IcCFtick style={{ fontSize: '16px', color: 'red' }} />
				<div className={styles.extra_details}>{item?.value}</div>
			</div>
		) : null))
		.filter((item) => !!item);
};

const tagsToShow = (data) => data?.tags
	?.map((item) => (item ? (
		<div style={{ display: 'flex', alignItems: 'center', width: '40%', margin: '4px' }}>
			<IcCFtick style={{ fontSize: '16px' }} />

			<div className={styles.extra_details}>{item}</div>
		</div>
	) : null))
	.filter((item) => !!item);

function FtlRateCard({
	searchData = {},
	data = {},
	setState = () => {},
	state,
	details = {},
	refetch = () => {},
	enquiry_page = false,
	results_type = '',
	id,
}) {
	if (data?.source === 'contract') {
		return <ContractRateCard data={data} details={data} />;
	}

	const [open, setOpen] = useState(false);

	const { touch_points = {} } = searchData || {};
	const { primary_service = {} } = touch_points || {};
	const { enroute = [] } = primary_service || {};

	const isOriginHaulageRates = !!Object.values(data?.service_rates).find(
		(service) => service?.is_rate_available
			&& service?.service_type === 'haulage_freight'
			&& service?.trade_type === 'export',
	);
	const isDestinationHaulageRates = !!Object.values(data?.service_rates).find(
		(service) => service?.is_rate_available
			&& service?.service_type === 'haulage_freight'
			&& service?.trade_type === 'import',
	);

	const forwardJourney = enroute.filter(
		(element) => element.trip_type === 'one_way',
	);

	const returnJourney = enroute.filter(
		(element) => element.trip_type === 'round',
	);

	function TripType() {
		return (
			<>
				{' '}
				{data?.service_type !== 'ltl_freight' ? (
					<div className={styles.trip_type_div}>
						<div className={styles.trip_type_tag}>{startCase(details?.trip_type)}</div>
					</div>
				) : null}
			</>
		);
	}

	return (
		<div
			className={styles.container}
			style={
				results_type === 'rfq' ? { width: '100%', marginLeft: '10px' } : {}
			}
			id={id}
		>
			<div className={styles.card}>
				<div className={styles.route_div}>
					<div style={{ display: 'flex', flex: 1 }} display="block">
						<div className={`${styles.cogo_assured} ${data?.source}`}>
							{data?.source === 'cogo_assured_rate' && (
								<div style={{ display: 'flex' }}>
									<img
										src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-verifiedmark.svg"
										alt="approve"
									/>
									<div className={styles.cogoport_text}>Cogoport</div>
								</div>
							)}
							<div className={data?.source}>
								{RATE_SOURCE_MAPPING[data?.source] || 'System Rate'}
							</div>
						</div>
						<Route
							data={data}
							details={details}
							results_type={results_type}
							isOriginHaulageRates={isOriginHaulageRates}
							isDestinationHaulageRates={isDestinationHaulageRates}
						/>

						{TripType()}

						<HaulageText
							data={data}
							details={details}
							isOriginHaulageRates={isOriginHaulageRates}
							isDestinationHaulageRates={isDestinationHaulageRates}
						/>

						<Promocode promotion={data.promocode} />
						{detailsToShow(data)?.length > 0 ? (
							<>
								<div className={`${styles.line_vrt} ${styles.horizontal}`} />

								<div style={{ padding: '10px 30px', flexWrap: 'wrap', display: 'flex' }}>
									{detailsToShow(data)}
									{tagsToShow(data)}
								</div>

								{results_type === 'rfq' ? (
									<div
										className={`${styles.line_vrt} ${styles.horizontal}`}
										style={{ marginTop: '0px' }}
									/>
								) : null}
							</>
						) : null}
					</div>
					<div className={styles.line_vrt} />

					{returnJourney?.length > 0 || forwardJourney?.length > 0 ? (
						<TruckingTouchPoints touchPoints={enroute} />
					) : null}

					<div className={styles.line_vrt} />
				</div>
				<div className={styles.quotation_div}>
					<Quotation
						data={data}
						state={state}
						setState={setState}
						setOpen={setOpen}
						open={open}
						refetch={refetch}
						enquiry_page={enquiry_page}
						details={details}
						results_type={results_type}
						spot_search_id={details?.id}
						id={id}
						isConfirmed={false}
					/>
				</div>
			</div>
			<div className={styles.line_horizontal} />
			<div className={styles.details}>
				<ContainerDetails searchData={searchData} data={data} />
			</div>

			<div className={styles.animted_container} type={open ? 'enter' : 'exit'}>
				<QuotationDetails
					details={details}
					data={data}
					id={id}
					isConfirmed={false}
				/>
			</div>
		</div>
	);
}

export default FtlRateCard;
