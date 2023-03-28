import { APP_EVENT, trackEvent } from '@cogo/commons/analytics';
import formatAmount from '@cogo/globalization/utils/formatAmount';
import { useSelector } from '@cogo/store';
import {
	Button,
	Modal,
	Text as OgText,
	ToolTip,
} from '@cogoport/front/components';
import { isEmpty } from '@cogoport/front/utils';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useCreateCheckout from '../../../hooks/useCreateCheckout';
import LikeDislike from '../LikeDislike';

import CogoPoints from './CogoPoints';
import ContractCreation from './ContractCreation';
import NoRatesServicesConfirmation from './NoRatesServicesConfirmation';
import {
	Container,
	Text,
	BreakupBtn,
	LimitedOfferDeal,
	ButtonPriceContainer,
	DislikeContainer,
	CoinContainer,
	InfoIcon,
	BreakupBtnContainer,
	LockButton,
} from './styles';

const LIKE_DISLIKE_ALLOWED = [
	'fcl_freight',
	'air_freight',
	'ftl_freight',
	'ltl_freight',
	'lcl_freight',
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'haulage_freight',
	'trailer_freight',
];

function Quotation({
	data = {},
	state,
	setState,
	setOpen = () => {},
	open = false,
	refetch = () => {},
	enquiry_page = false,
	details = {},
	results_type = '',
	spot_search_id = '',
	id,
	isConfirmed = false,
	viewSchedules = false,
	setViewSchedules = () => {},
	setScheduleId,
}) {
	const { query, scope, isMobile } = useSelector(({ general }) => ({
		scope    : general.scope,
		query    : general.query,
		isMobile : general.isMobile,
	}));
	const [showContract, setShowContract] = useState(false);

	const {
		handleBook,
		loading,
		confirmation,
		setConfirmation,
		noRatesServices,
		handleSave,
	} = useCreateCheckout({ data, spot_search_id, id });

	const { service_rates = {}, service_type = '', source = '' } = data || {};
	const unavailableRatesCount = Object.values(service_rates).reduce(
		(acc, curr) => {
			const { is_rate_available = false } = curr || {};
			if (is_rate_available) {
				return acc;
			}
			return acc + 1;
		},
		0,
	);
	const price = data?.freight_price_discounted || 0;
	const freight_price =		data.service_type === 'air_freight'
		? price / (details?.chargeable_weight || 1) || 0
		: price || 0;

	const basicFreight =		data?.freight_price_discounted >= 0
		&& details?.trade_type !== 'domestic'
		&& details?.service_type !== 'cargo_insurance' ? (
			<Text className={isConfirmed ? 'confirmed' : ''}>
				{`Freight ${data.service_type === 'air_freight' ? 'per kg' : ''} :`}
				<span style={{ fontWeight: 700, marginLeft: '4px' }}>
					{formatAmount({
						amount   : freight_price,
						currency : data?.freight_price_currency,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'symbol',
							maximumFractionDigits : 0,
						},
					})}
				</span>
			</Text>
		) : null;

	const buttonStyles = isConfirmed
		? {
			border     : loading ? '1px solid #c2c2c2' : '1px solid #dc9f2e',
			background : loading
				? '#c2c2c2'
				: 'linear-gradient(102.8deg, #EEAB30 4.45%, #FFCE74 35.29%, #F5B02E 65.49%)',
			boxShadow    : loading ? 'none' : '0px 4px 10px rgba(34, 34, 34, 0.2)',
			borderRadius : 10,
			marginBottom : '8px 0px 16px 0px',
			color        : '#51390c',
		  }
		: {
			background : loading ? '#c2c2c2' : '#333333',
			border     : loading ? '1px solid #c2c2c2' : '1px solid #333333',
			boxSizing  : 'border-box',
			margin     : '8px 0px 16px 0px',
		  };

	let isPriceDiscounted = false;
	if (
		!['rfq', 'contract'].includes(results_type)
		&& (data?.total_price || 0) > (data?.total_price_discounted || 0)
	) {
		isPriceDiscounted = true;
	}

	const updateRate = (cardId, newVal) => {
		const newRates = state.rates.map((datas) => {
			const { card } = datas;

			if (card !== cardId) {
				return datas;
			}

			return {
				...datas,
				...(newVal || {}),
			};
		});

		setState((prevState) => ({
			...prevState,
			rates: newRates,
		}));
	};

	const services_ids = Object.keys(details?.service_details || {});
	const services = (services_ids || []).map((key) => ({
		...details?.service_details[key],
		id: key,
	}));
	const container_sizes = (services || [])
		.filter((cs) => cs?.container_size)
		.map((item) => `${item?.container_size}`);
	const containerCount = [...new Set(container_sizes)]?.length;

	const contractCard = (state?.rates || []).filter(
		(s) => s.source === 'contract',
	).length;

	const isRateAvailable = Object.values(service_rates).filter(
		(v) => v.service_type === 'lcl_freight_local' && v.is_rate_available === false,
	);
	const lockFreight =		containerCount <= 1
		&& ((!['cogo_assured_rate', 'contract'].includes(source)
			&& ['fcl_freight', 'lcl_freight', 'air_freight'].includes(service_type))
			|| (service_type === 'air_freight' && data?.trade_type !== 'domestic'))
		&& contractCard < 1
		&& isEmpty(isRateAvailable);
	return (
		<Container>
			{LIKE_DISLIKE_ALLOWED.includes(details?.search_type) && (
				<DislikeContainer>
					<LikeDislike details={details} updateRate={updateRate} rate={data} />
				</DislikeContainer>
			)}
			{isConfirmed ? (
				<LimitedOfferDeal>Limited Time Offer</LimitedOfferDeal>
			) : (
				basicFreight
			)}
			<ButtonPriceContainer className={isConfirmed ? 'confirmed' : ''}>
				{enquiry_page === false
				&& !['rfq', 'contract'].includes(results_type) ? (
					<>
						{isPriceDiscounted && (
							<OgText
								align="center"
								size="1em"
								color="#999"
								style={{ marginBottom: 4, textDecoration: 'line-through' }}
								letterSpacing={1}
							>
								{`${formatAmount({
									amount   : data?.total_price || 0,
									currency : data?.total_price_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'symbol',
										maximumFractionDigits : 0,
									},
								})}`}
							</OgText>
						)}
						<Button
							onClick={() => {
								if (scope === 'app') {
									let provider;
									let line;
									const additonal_serivces_names = [];
									Object.keys(data.service_rates).map((datas) => {
										if (
											data.service_rates[datas].service_type
											!== data.service_type
										) {
											additonal_serivces_names.push(
												data.service_rates[datas].service_type,
											);
										}
										return null;
									});
									if (
										data.service_type === 'air_freight'
										|| data.service_type === 'air_customs'
									) {
										line = (data.airline || {}).short_name;
										provider = (data.airline || {}).business_name;
									} else {
										line = (data.shipping_line || {}).short_name;
										provider = (data.shipping_line || {}).business_name;
									}
									trackEvent(APP_EVENT.search_booked_rate, {
										amount              : data.total_price,
										amount_currency     : data.total_price_currency,
										shipping_line       : line,
										service_provider    : provider,
										additional_services : additonal_serivces_names,
									});
								}
								handleBook();
							}}
							disabled={loading}
							id={`${id}_book_btn`}
							style={buttonStyles}
						>
							Book at
							<span style={{ marginLeft: '6px' }}>
								{`${formatAmount({
									amount   : data?.total_price_discounted || 0,
									currency : data?.total_price_currency,
									options  : {
										style                 : 'currency',
										currencyDisplay       : 'symbol',
										maximumFractionDigits : 0,
									},
								})}`}
							</span>
						</Button>
					</>
					) : null}

				{results_type === 'rfq' ? (
					<div style={{ color: '#67C676', fontSize: '18px', fontWeight: 700 }}>
						{`Total: ${formatAmount({
							amount   : data?.total_price_discounted || 0,
							currency : data?.total_price_currency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'symbol',
								maximumFractionDigits : 0,
							},
						})}`}
					</div>
				) : null}

				{isConfirmed ? (
					basicFreight
				) : (
					// <Text className="red">{`(Via ${startCase(data?.source)})`}</Text>
					<> </>
				)}

				{results_type === 'rfq' ? (
					<Button
						onClick={() => handleSave()}
						disabled={loading}
						style={{
							background    : loading ? '#c2c2c2' : '#2C3E50',
							border        : loading ? '1px solid #c2c2c2' : '1px solid #2C3E50',
							fontSize      : '10px',
							fontWeight    : 500,
							padding       : '8px',
							textTransform : 'capitalize',
							marginBottom  : isMobile ? '10px' : '0px',
						}}
						id="rfq_customize_quote_search"
					>
						Customize Quote
					</Button>
				) : null}
			</ButtonPriceContainer>
			{lockFreight && (
				<LockButton
					className="secondary sm"
					ghost
					onClick={() => setShowContract(true)}
				>
					Lock Freight Price
				</LockButton>
			)}
			{!['trailer_freight', 'rail_domestic_freight'].includes(
				data?.service_type,
			) && (
				<BreakupBtnContainer>
					<BreakupBtn
						onClick={() => {
							if (scope === 'app') {
								let line;
								let provider;
								if (
									data.service_type === 'air_freight'
									|| data.service_type === 'air_customs'
								) {
									line = (data.airline || {}).short_name;
									provider = (data.airline || {}).business_name;
								} else {
									line = (data.shipping_line || {}).short_name;
									provider = (data.shipping_line || {}).business_name;
								}
								trackEvent(APP_EVENT.search_viewed_rate_breakup, {
									amount           : data.total_price,
									amount_currency  : data.total_price_currency,
									shipping_line    : line,
									service_provider : provider,
								});
							}
							setOpen(!open);
						}}
						id={`${id}_view_breakup`}
					>
						View Breakup
						{open ? (
							<IcMArrowRotateUp style={{ marginLeft: '6px' }} size={1.25} />
						) : (
							<IcMArrowRotateDown style={{ marginLeft: '6px' }} size={1.25} />
						)}
					</BreakupBtn>
					<br />
					{scope === 'app' && (
						<BreakupBtn
							onClick={() => {
								setViewSchedules(!viewSchedules);
								setScheduleId(data.shipping_line?.id);
							}}
						>
							View Schedules
							{viewSchedules ? (
								<IcMArrowRotateDown style={{ marginLeft: '6px' }} size={1.25} />
							) : (
								<IcMArrowRotateUp style={{ marginLeft: '6px' }} size={1.25} />
							)}
						</BreakupBtn>
					)}
					{unavailableRatesCount && data.service_type === 'fcl_freight' ? (
						<ToolTip
							theme="light"
							placement="top"
							content={(
								<div>
									Rates for
									{' '}
									{unavailableRatesCount}
									{' '}
									services are not found
								</div>
							)}
						>
							<div>
								<InfoIcon />
							</div>
						</ToolTip>
					) : null}
				</BreakupBtnContainer>
			)}

			<CoinContainer>
				<CogoPoints rate={data} />
			</CoinContainer>
			{confirmation ? (
				<Modal
					show={confirmation}
					onClose={() => setConfirmation(false)}
					width={isMobile ? 300 : 550}
				>
					<NoRatesServicesConfirmation
						noRatesArr={noRatesServices}
						setConfirmation={setConfirmation}
						data={data}
						scope={scope}
						search_id={query?.search_id}
						refetch={refetch}
					/>
				</Modal>
			) : null}
			<ContractCreation
				data={data}
				details={details}
				showContract={showContract}
				setShowContract={setShowContract}
			/>
		</Container>
	);
}

export default Quotation;
