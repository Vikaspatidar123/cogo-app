import React, { useState } from 'react';
import { useSelector } from '@cogo/store';
import { Flex } from '@cogoport/front/components';
import { IcCFtick } from '@cogoport/icons-react';
import Quotation from '../RateCard/Quotation';
import QuotationDetails from '../RateCard/QuotationDetails';
import PromoCode from '../RateCard/Promocode';

import {
	Container,
	Card,
	Text,
	CogoAssured,
	CogoportText,
	Details,
	LineHorizontal,
	FreightDetailsDiv,
	FreightDetailsText,
	FreightDetails,
	InfoDiv,
	QuotationButton,
	LineVertical,
} from './styles';
import ContainerDetails from './ContainerDetails';
import LocationDetails from '../Info/TrailerFreightInfo/LocationDetails';

const RATE_SOURCE_MAPPING = {
	spot_rates: 'System Rate',
	spot_negotiation_rate: 'Enquiry Reverted Rate',
	predicted: 'Predicted Rate',
	cogo_assured_rate: 'Assured',
};

const TrailerFreightRateCard = ({
	id,
	state,
	setState = () => {},
	data = {},
	details = {},
	refetch = () => {},
	enquiry_page = false,
	results_type = '',
}) => {
	const { scope } = useSelector(({ general }) => ({
		scope: general?.scope,
		isMobile: general?.isMobile,
	}));

	const [open, setOpen] = useState(true);

	let totalContainerCount = 0;
	let totalCargoWeightPerContainerCount = 0;

	const { service_details = {} } = details || {};

	Object.values(service_details).map((item) => {
		const { containers_count = '', cargo_weight_per_container = '' } =
			item || {};

		totalContainerCount += containers_count;

		totalCargoWeightPerContainerCount +=
			containers_count * cargo_weight_per_container * 1000;

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
		<Container
			className={scope === 'app' ? 'app' : ''}
			style={
				results_type === 'rfq' ? { width: '100%', marginLeft: '10px' } : {}
			}
			id={id}
		>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<Card>
					<Flex display="block" flex={1}>
						<CogoAssured className={data?.source}>
							{data?.source === 'cogo_assured_rate' && (
								<div style={{ display: 'flex' }}>
									<IcCFtick />
									<CogoportText>Cogoport</CogoportText>
								</div>
							)}
							<Text className={data?.source}>
								{RATE_SOURCE_MAPPING[data?.source] || 'System Rate'}
							</Text>
						</CogoAssured>

						<InfoDiv>
							<LocationDetails data={details} />

							<Flex padding={16}>
								<FreightDetailsDiv>
									<FreightDetailsText>OPERATOR : </FreightDetailsText>
									<FreightDetails>
										{data?.service_provider?.business_name || ' '}
									</FreightDetails>
								</FreightDetailsDiv>
								<FreightDetailsDiv>
									<FreightDetailsText>EST. TRANSIT TIME : </FreightDetailsText>
									<FreightDetails>{maxTransitTime || ''} Days</FreightDetails>
								</FreightDetailsDiv>
							</Flex>

							<Details>
								<ContainerDetails
									data={data}
									details={details}
									service_type={data.service_type}
								/>
							</Details>
						</InfoDiv>
						<PromoCode promotion={data.promocode} />
					</Flex>

					<LineVertical />

					<QuotationButton>
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

						<LineHorizontal />

						<Flex paddingTop={16} paddingLeft={16} direction="column">
							<FreightDetailsDiv>
								<FreightDetailsText>Avg. Cost/Container :</FreightDetailsText>
								<FreightDetails>
									{Number(data?.total_price / totalContainerCount).toFixed(4) ||
										' '}{' '}
									{data?.total_price_currency}
								</FreightDetails>
							</FreightDetailsDiv>
							<FreightDetailsDiv>
								<FreightDetailsText>Avg. Cost/Tonne :</FreightDetailsText>
								<FreightDetails>
									{Number(
										data?.total_price / totalCargoWeightPerContainerCount,
									).toFixed(4) || ''}{' '}
									{data?.total_price_currency}
								</FreightDetails>
							</FreightDetailsDiv>
						</Flex>
					</QuotationButton>
				</Card>
			</div>

			<QuotationDetails
				details={details}
				data={data}
				id={id}
				isConfirmed={false}
			/>
		</Container>
	);
};

export default TrailerFreightRateCard;
