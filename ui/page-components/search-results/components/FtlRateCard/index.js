import React, { useState } from 'react';
import { useSelector } from '@cogo/store';
import { Flex } from '@cogoport/front/components';
import { startCase } from 'lodash';
import TruckingTouchPoints from '@cogo/business-modules/components/TruckingTouchPoints';
import { IcCFtick } from '@cogoport/icons-react';
import Quotation from '../RateCard/Quotation';
import Route from '../RateCard/Route';
import QuotationDetails from '../RateCard/QuotationDetails';
import HaulageText from '../RateCard/HaulageText';
import Promocode from '../RateCard/Promocode';
import ContainerDetails from './ContainerDetails';
import {
	Container,
	Card,
	Text,
	LineVrt,
	ExtraDetails,
	AnimatedContainer,
	CogoAssured,
	CogoportText,
	Details,
	LineHorizontal,
	RouteDiv,
	QuotationDiv,
	TripTypeDiv,
	TripTypeTag,
} from './styles';
import ContractRateCard from '../ContractRateCard';

const RATE_SOURCE_MAPPING = {
	spot_rates: 'System Rate',
	spot_negotiation_rate: 'Enquiry Reverted Rate',
	predicted: 'Predicted Rate',
	cogo_assured_rate: 'Assured',
};

const detailsToShow = (data) => {
	const details = [
		{
			value:
				data?.destination_detention?.free_limit ||
				data?.destination_detention?.free_limit === 0 ||
				data?.search_type === 'fcl_freight'
					? `${
							data?.destination_detention?.free_limit || 0
					  } free detention days`
					: null,
		},
		{
			value:
				data?.destination_storage?.free_limit ||
				data?.destination_storage?.free_limit === 0 ||
				['air_freight', 'lcl_freight'].includes(data?.search_type)
					? `${data?.destination_storage?.free_limit || 0} free storage ${
							data?.search_type === 'air_freight' ? 'hours' : 'days'
					  }`
					: null,
		},
	];

	return details
		.map((item) =>
			item?.value ? (
				<Flex style={{ alignItems: 'center', width: '40%', margin: '4px' }}>
					<IcCFtick style={{ fontSize: '16px', color: 'red' }} />
					<ExtraDetails>{item?.value}</ExtraDetails>
				</Flex>
			) : null,
		)
		.filter((item) => !!item);
};

const tagsToShow = (data) => {
	return data?.tags
		?.map((item) =>
			item ? (
				<Flex style={{ alignItems: 'center', width: '40%', margin: '4px' }}>
					<IcCFtick style={{ fontSize: '16px' }} />

					<ExtraDetails>{item}</ExtraDetails>
				</Flex>
			) : null,
		)
		.filter((item) => !!item);
};

const FtlRateCard = ({
	searchData = {},
	data = {},
	setState = () => {},
	state,
	details = {},
	refetch = () => {},
	enquiry_page = false,
	results_type = '',
	id,
}) => {
	if (data?.source === 'contract') {
		return <ContractRateCard data={data} details={data} />;
	}

	const [open, setOpen] = useState(false);

	const { touch_points = {} } = searchData || {};
	const { primary_service = {} } = touch_points || {};
	const { enroute = [] } = primary_service || {};

	const { scope, isMobile } = useSelector(({ general }) => ({
		scope: general?.scope,
		isMobile: general?.isMobile,
	}));

	const isOriginHaulageRates = !!Object.values(data?.service_rates).find(
		(service) =>
			service?.is_rate_available &&
			service?.service_type === 'haulage_freight' &&
			service?.trade_type === 'export',
	);
	const isDestinationHaulageRates = !!Object.values(data?.service_rates).find(
		(service) =>
			service?.is_rate_available &&
			service?.service_type === 'haulage_freight' &&
			service?.trade_type === 'import',
	);

	const forwardJourney = enroute.filter(
		(element) => element.trip_type === 'one_way',
	);

	const returnJourney = enroute.filter(
		(element) => element.trip_type === 'round',
	);

	const TripType = () => {
		return (
			<>
				{data?.service_type !== 'ltl_freight' ? (
					<TripTypeDiv>
						<TripTypeTag>{startCase(details?.trip_type)}</TripTypeTag>
					</TripTypeDiv>
				) : null}
			</>
		);
	};

	return (
		<Container
			className={scope === 'app' ? 'app' : ''}
			style={
				results_type === 'rfq' ? { width: '100%', marginLeft: '10px' } : {}
			}
			id={id}
		>
			<Card>
				<RouteDiv>
					<Flex display="block" flex={1}>
						<CogoAssured className={data?.source}>
							{data?.source === 'cogo_assured_rate' && (
								<div style={{ display: 'flex' }}>
									<img
										src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-verifiedmark.svg"
										alt="approve"
									/>
									<CogoportText>Cogoport</CogoportText>
								</div>
							)}
							<Text className={data?.source}>
								{RATE_SOURCE_MAPPING[data?.source] || 'System Rate'}
							</Text>
						</CogoAssured>
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
								<LineVrt className="horizontal" />

								<Flex style={{ padding: '10px 30px', flexWrap: 'wrap' }}>
									{detailsToShow(data)}
									{tagsToShow(data)}
								</Flex>

								{results_type === 'rfq' && isMobile ? (
									<LineVrt
										className="horizontal"
										style={{ marginTop: '0px' }}
									/>
								) : null}
							</>
						) : null}
					</Flex>
					<LineVrt />

					{returnJourney?.length > 0 || forwardJourney?.length > 0 ? (
						<>
							<TruckingTouchPoints touchPoints={enroute} />
						</>
					) : null}

					<LineVrt />
				</RouteDiv>
				<QuotationDiv>
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
				</QuotationDiv>
			</Card>
			<LineHorizontal />
			<Details>
				<ContainerDetails searchData={searchData} data={data} />
			</Details>

			<AnimatedContainer type={open ? 'enter' : 'exit'}>
				<QuotationDetails
					details={details}
					data={data}
					id={id}
					isConfirmed={false}
				/>
			</AnimatedContainer>
		</Container>
	);
};

export default FtlRateCard;
