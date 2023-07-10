import { cl } from '@cogoport/components';
import { IcCFtick } from '@cogoport/icons-react';
import React, { useState } from 'react';

import getPromotion from '../../utils/getPromotion';
import LocationDetails from '../Info/TrailerFreightInfo/LocationDetails';
import PromoCode from '../RateCard/Promocode';
import Quotation from '../RateCard/Quotation';
import QuotationDetails from '../RateCard/QuotationDetails';

import ContainerDetails from './ContainerDetails';
import styles from './styles.module.css';

const RATE_SOURCE_MAPPING = {
	spot_rates            : 'System Rate',
	spot_negotiation_rate : 'Enquiry Reverted Rate',
	predicted             : 'Predicted Rate',
	cogo_assured_rate     : 'Assured',
};

function TrailerFreightRateCard({
	id,
	state,
	setState = () => {},
	data = {},
	details = {},
	refetch = () => {},
	enquiry_page = false,
	results_type = '',
}) {
	const [open, setOpen] = useState(true);

	let totalContainerCount = 0;
	let totalCargoWeightPerContainerCount = 0;

	const { service_details = {} } = details || {};

	Object.values(service_details).map((item) => {
		const { containers_count = '', cargo_weight_per_container = '' } =			item || {};

		totalContainerCount += containers_count;

		totalCargoWeightPerContainerCount
			+= containers_count * cargo_weight_per_container * 1000;

		return null;
	});

	const { service_rates = {} } = data || {};
	let maxTransitTime = 0;

	Object.values(service_rates).map((item) => {
		const { transit_time = '' } = item || {};

		if (maxTransitTime < transit_time) {
			maxTransitTime = transit_time;
		}
		return null;
	});

	return (
		<div
			className={styles.container}
			style={
				results_type === 'rfq' ? { width: '100%', marginLeft: '10px' } : {}
			}
			id={id}
		>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div className={styles.card}>
					<div style={{ display: 'block', flex: 1 }}>
						<div className={`${styles.cogo_assured} ${data?.source}`}>
							{data?.source === 'cogo_assured_rate' && (
								<div style={{ display: 'flex' }}>
									<IcCFtick />
									<div className={styles.cogoportText}>Cogoport</div>
								</div>
							)}
							<div className={cl`${styles.text} ${data?.source}`}>
								{RATE_SOURCE_MAPPING[data?.source] || 'System Rate'}
							</div>
						</div>

						<div className={styles.info_div}>

							<LocationDetails data={details} />

							<div className={styles.flex} style={{ padding: '16px' }}>
								<div className={styles.freight_details_div}>
									<div className={styles.freight_details_text}>OPERATOR : </div>
									<div className={styles.freight_details}>
										{data?.service_provider?.business_name || ' '}
									</div>
								</div>
								<div className={styles.freight_details_div}>
									<div className={styles.freight_details_text}>EST. TRANSIT TIME : </div>
									<div className={styles.freight_details}>
										{maxTransitTime || ''}
										{' '}
										Days
									</div>
								</div>
							</div>

							<div className={styles.details}>
								<ContainerDetails
									data={data}
									details={details}
									service_type={data.service_type}
								/>
							</div>
						</div>

						<PromoCode promotion={getPromotion({ promocodes: data.promocode })} />

					</div>

					<div className={styles.line_vertical} />

					<div className={styles.quotation_button}>
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

						<div className={styles.line_vertical} />

						<div className={styles.flex} style={{ padding: '16px 0 0 16px', flexDirection: 'column' }}>
							<div className={styles.freight_details_div}>
								<div className={styles.freight_details_text}>Avg. Cost/Container :</div>
								<div className={styles.freight_details}>
									{Number((data?.total_price || 0) / totalContainerCount).toFixed(4)
										|| ' '}
									{' '}
									{data?.total_price_currency}
								</div>
							</div>
							<div className={styles.freight_details_div}>
								<div className={styles.freight_details_text}>Avg. Cost/Tonne :</div>
								<div className={styles.freight_details}>
									{Number(
										(data?.total_price || 0) / totalCargoWeightPerContainerCount,
									).toFixed(4) || ''}
									{' '}
									{data?.total_price_currency}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<QuotationDetails
				details={details}
				data={data}
				id={id}
				isConfirmed={false}
			/>
		</div>
	);
}

export default TrailerFreightRateCard;
