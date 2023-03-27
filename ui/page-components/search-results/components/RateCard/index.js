import React, { useState } from 'react';
import { useSelector } from '@cogo/store';
import { Flex } from '@cogoport/front/components';
import { startCase } from '@cogoport/front/utils';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import { IcCFtick } from '@cogoport/icons-react';
import Quotation from './Quotation';
import Route from './Route';
import QuotationDetails from './QuotationDetails';
import HaulageText from './HaulageText';
import Promocode from './Promocode';
import {
	Container,
	Card,
	Text,
	LineVrt,
	Line,
	Dates,
	Code,
	ExtraDetails,
	AnimatedContainer,
	CodeAndRemarks,
	CRContainer,
	CogoAssured,
	CogoportText,
	RateValidity,
	RateValidityTag,
	RateValidityDate,
	Wrapper,
	CogoUniverse,
	ScheduleTag,
	ScheduleDate,
	FclTransitTime,
	Schedules,
} from './styles';
import DetentionDemurrage from './DetentionDemurrage';
import { FclTags } from './Tags/FclTags';
import AirTags from './Tags/AirTags';
import ScheduleDetails from './ScheduleDetails';

const RATE_SOURCE_MAPPING = {
	spot_rates: 'System Rate',
	spot_negotiation_rate: 'Enquiry Reverted Rate',
	predicted: 'Predicted Rate',
	cogo_assured_rate: 'Assured',
};

const detailsToShow = (data, details) => {
	const detailsData = [
		{
			value:
				data?.transit_time &&
				['air_freight', 'lcl_freight'].includes(data?.service_type)
					? `Transit Time - ${data?.transit_time || 0} ${
							['lcl_freight'].includes(data?.service_type) ? 'Days' : 'Hours'
					  }  `
					: null,
		},

		{
			value:
				details?.chargeable_weight &&
				['air_freight'].includes(data?.service_type)
					? `Chargeable weight - ${details?.chargeable_weight || 0}kgs`
					: null,
		},

		{
			value:
				(data?.origin_storage?.free_limit ||
					data?.origin_storage?.free_limit === 0) &&
				['air_freight', 'lcl_freight'].includes(data?.service_type)
					? `${
							data?.origin_storage?.free_limit || 0
					  } free origin storage hours `
					: null,
		},

		{
			value:
				(data?.destination_storage?.free_limit ||
					data?.destination_storage?.free_limit === 0) &&
				['air_freight', 'lcl_freight'].includes(data?.service_type)
					? `${
							data?.destination_storage?.free_limit || 0
					  } free destination storage ${
							data?.service_type === 'air_freight' ? 'hours' : 'days'
					  }`
					: null,
		},

		{
			value:
				data?.operation_type && ['air_freight'].includes(data?.service_type)
					? `Operation Type - ${data?.operation_type || ''}`
					: null,
		},
	];

	return detailsData
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

function RateCard(props) {
	const { scope, isMobile, partnerId } = useSelector(
		({ general, profile }) => ({
			scope: general?.scope,
			isMobile: general?.isMobile,
			partnerId: profile?.partner?.id,
		}),
	);

	const {
		data = {},
		setState = () => {},
		state,
		details = {},
		refetch = () => {},
		enquiry_page = false,
		results_type = '',
		searchData = {},
		id,
		scheduleList,
	} = props;
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const [viewSchedules, setViewSchedules] = useState(false);
	const [activeTab, setActiveTab] = useState('origin');
	const [scheduleId, setScheduleId] = useState('');
	const scheduleData = scheduleList?.filter(
		(x) => x.shipping_line_id === scheduleId,
	);
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

	let flag = false;
	(data?.line_items || []).forEach((item) => {
		if (item?.remarks?.length > 0) {
			flag = true;
		}
	});

	const showSchedules = () => {
		if (data?.source !== 'cogo_assured_rate') {
			if (!data?.departure && !data?.arrival) {
				return null;
			}

			return (
				<Schedules>
					<ScheduleTag>
						Schedule
						{['fake', 'predicted'].includes(data?.schedule_source)
							? ' - Estimated'
							: null}
					</ScheduleTag>
					<ScheduleDate>
						{data?.service_type === 'fcl_freight' ? <>(ETD)</> : null}
						<Dates>
							{formatDate({
								date: data?.departure,
								dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType: 'date',
							})}
						</Dates>
						<Line />
						<Dates>
							{formatDate({
								date: data?.arrival,
								dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType: 'date',
							})}
						</Dates>
						{data?.service_type === 'fcl_freight' ? <>(ETA)</> : null}
					</ScheduleDate>
					{data?.service_type === 'fcl_freight' && data?.transit_time ? (
						<FclTransitTime>
							Transit Time : {data?.transit_time} Days
						</FclTransitTime>
					) : null}
				</Schedules>
			);
		}
		return (
			<RateValidity>
				<RateValidityTag>Rate Validity</RateValidityTag>

				<RateValidityDate>
					<Dates>
						{formatDate({
							date: data?.validity_start,
							dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType: 'date',
						})}
					</Dates>

					<Line />

					<Dates>
						{formatDate({
							date: data?.validity_end,
							dateFormat: GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType: 'date',
						})}
					</Dates>
				</RateValidityDate>
			</RateValidity>
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
				<Flex display="block" flex={1}>
					<Flex justifyContent="space-between">
						<Flex>
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
									{RATE_SOURCE_MAPPING[data?.source] || 'System Rate'}{' '}
								</Text>
							</CogoAssured>

							{['air_freight', 'fcl_freight'].includes(data?.service_type) &&
							data?.cogo_entity_id &&
							partnerId !== data?.cogo_entity_id ? (
								<CogoUniverse>via Cogo Universe</CogoUniverse>
							) : null}
						</Flex>

						{data?.service_type === 'haulage_freight' ? (
							<Wrapper className="payment_term">
								<Text> {startCase(data?.haulage_type)}</Text>
							</Wrapper>
						) : null}

						{data?.service_type === 'fcl_freight' ? (
							<FclTags data={data} />
						) : null}

						{data?.service_type === 'air_freight' ? (
							<AirTags data={data} />
						) : null}
					</Flex>

					<Route
						data={data}
						details={details}
						results_type={results_type}
						isOriginHaulageRates={isOriginHaulageRates}
						isDestinationHaulageRates={isDestinationHaulageRates}
						isMobile={isMobile}
					/>

					{showSchedules()}

					<HaulageText
						data={data}
						details={details}
						isOriginHaulageRates={isOriginHaulageRates}
						isDestinationHaulageRates={isDestinationHaulageRates}
					/>

					<Promocode promotion={data.promocode} />

					{detailsToShow(data, details)?.length > 0 ? (
						<>
							<LineVrt className="horizontal" />

							<Flex style={{ padding: '10px 30px', flexWrap: 'wrap' }}>
								{detailsToShow(data, details)}
								{tagsToShow(data)}
							</Flex>

							{results_type === 'rfq' && isMobile ? (
								<LineVrt className="horizontal" style={{ marginTop: '0px' }} />
							) : null}
						</>
					) : null}

					{scope === 'partner' && flag ? (
						<CodeAndRemarks>
							{(data?.line_items || []).map((item) => {
								if (item?.remarks?.length > 0) {
									return (
										<CRContainer>
											<Code>{item?.code} :</Code>
											<Code className="remarks">
												{(item?.remarks || []).map((items) => {
													return <div>{items}</div>;
												})}
											</Code>
										</CRContainer>
									);
								}
								return null;
							})}
						</CodeAndRemarks>
					) : null}
				</Flex>

				<LineVrt />

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
					viewSchedules={viewSchedules}
					setViewSchedules={setViewSchedules}
					isConfirmed={false}
					setScheduleId={setScheduleId}
				/>
			</Card>

			{open && (
				<AnimatedContainer type={open ? 'enter' : 'exit'}>
					<QuotationDetails
						searchData={searchData}
						details={details}
						data={data}
						id={id}
						isConfirmed={false}
					/>
				</AnimatedContainer>
			)}

			{viewSchedules && (
				<AnimatedContainer type={viewSchedules ? 'enter' : 'exit'}>
					{scheduleData.map((x) => (
						<ScheduleDetails list={x.schedules} />
					))}
				</AnimatedContainer>
			)}

			{data?.service_type === 'fcl_freight' ? (
				<DetentionDemurrage
					show={show}
					setShow={setShow}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					{...props}
				/>
			) : null}
		</Container>
	);
}

export default RateCard;
