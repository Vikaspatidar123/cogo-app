import { Button, Modal, Tooltip } from '@cogoport/components';
import {
	IcMArrowRotateDown,
	IcMArrowRotateUp,
	IcMInfo,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useCreateCheckout from '../../../hooks/useCreateCheckout';
import LikeDislike from '../LikeDislike';

import ContractCreation from './ContractCreation';
import CogoPoints from './ContractCreation/CogoPoints';
import NoRatesServicesConfirmation from './NoRatesServicesConfirmation';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';
import formatAmount from '@/ui/commons/utils/formatAmount';
import {
	APP_EVENT,
	trackEvent,
} from '@/ui/page-components/discover_rates/common/analytics';

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
	const freight_price = data.service_type === 'air_freight'
    	? price / (details?.chargeable_weight || 1) || 0
    	: price || 0;

	const basicFreight = data?.freight_price_discounted >= 0
    && details?.trade_type !== 'domestic' ? (
	<div className={`${styles.text}`}>
		{`Freight ${data.service_type === 'air_freight' ? 'per kg' : ''} `}
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
	</div>
    	) : null;

	// const buttonStyles = isConfirmed
	// 	? {
	// 		border     : loading ? '1px solid #c2c2c2' : '1px solid #dc9f2e',
	// 		background : loading
	// 			? '#c2c2c2'
	// 			: 'linear-gradient(102.8deg, #EEAB30 4.45%, #FFCE74 35.29%, #F5B02E 65.49%)',
	// 		boxShadow    : loading ? 'none' : '0px 4px 10px rgba(34, 34, 34, 0.2)',
	// 		borderRadius : 10,
	// 		marginBottom : '8px 0px 16px 0px',
	// 		color        : '#51390c',
	// 	}
	// 	: {
	// 		background : loading ? '#c2c2c2' : '#333333',
	// 		border     : loading ? '1px solid #c2c2c2' : '1px solid #333333',
	// 		boxSizing  : 'border-box',
	// 		margin     : '8px 0px 16px 0px',
	// 	};

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
	const lockFreight = containerCount <= 1
    && ((!['cogo_assured_rate', 'contract'].includes(source)
      && ['fcl_freight', 'lcl_freight', 'air_freight'].includes(service_type))
      || (service_type === 'air_freight' && data?.trade_type !== 'domestic'))
    && contractCard < 1
    && isEmpty(isRateAvailable);
	return (
		<div className={styles.container}>
			{LIKE_DISLIKE_ALLOWED.includes(details?.search_type) && (
				<div className={styles.dislike_container}>
					<LikeDislike details={details} updateRate={updateRate} rate={data} />
				</div>
			)}
			{isConfirmed ? (
				<div className={styles.limited_offer_deal}>Limited Time Offer</div>
			) : (
      	basicFreight
			)}
			<div
				className={`${styles.ButtonPriceContainer} ${
        	isConfirmed ? 'confirmed' : ''
				}`}
			>
				{enquiry_page === false
        && !['rfq', 'contract'].includes(results_type) ? (
	<>
		{isPriceDiscounted && (
			<div
				className={styles.text}
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
			</div>
		)}
		<Button
			onClick={() => {
				let provider;
				let line;
				const additonal_serivces_names = [];
				Object.keys(data.service_rates).map((datas) => {
					if (
						data.service_rates[datas].service_type !== data.service_type
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

              	handleBook();
			}}
			disabled={loading}
			id={`${id}_book_btn`}
              // style={buttonStyles}
			loading={loading}
			themeType="accent"
			className={styles.button_styles}
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
						className={styles.button_styles}
						loading={loading}
						style={{
							background    : loading ? '#c2c2c2' : '#2C3E50',
							border        : loading ? '1px solid #c2c2c2' : '1px solid #2C3E50',
							fontSize      : '10px',
							fontWeight    : 500,
							padding       : '8px',
							textTransform : 'capitalize',
						}}
						id="rfq_customize_quote_search"
					>
						Customize Quote
					</Button>
				) : null}
			</div>
			{lockFreight && (
				<Button
					size="md"
					themeType="secondary"
					className={styles.button_styles}
					onClick={() => setShowContract(true)}
				>
					Lock Freight Price
				</Button>
			)}
			{!['trailer_freight', 'rail_domestic_freight'].includes(
      	        data?.service_type,
			) && (
				<div className={styles.breakup_btn_container}>
					<Button
						onClick={() => {
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

            	setOpen(!open);
						}}
						id={`${id}_view_breakup`}
						className={styles.button}
						size="md"
						themeType="tertiary"
						loading={loading}
					>
						View Breakup
						{open ? (
							<IcMArrowRotateUp style={{ marginLeft: '6px' }} size={1.25} />
						) : (
							<IcMArrowRotateDown style={{ marginLeft: '6px' }} size={1.25} />
						)}
					</Button>
					<br />

					{data?.source !== 'cogo_assured_rate' && (
						<Button
							onClick={() => {
								setViewSchedules(!viewSchedules);
								setScheduleId(data.shipping_line?.id);
							}}
							className={styles.button}
							size="md"
							themeType="tertiary"
						>
							View Schedules
							{!viewSchedules ? (
								<IcMArrowRotateDown style={{ marginLeft: '6px' }} size={1.25} />
							) : (
								<IcMArrowRotateUp style={{ marginLeft: '6px' }} size={1.25} />
							)}
						</Button>
					)}

					{unavailableRatesCount && data.service_type === 'fcl_freight' ? (
						<Tooltip
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
								<IcMInfo />
							</div>
						</Tooltip>
					) : null}
				</div>

			)}

			<div className={styles.coin_container}>
				<CogoPoints rate={data} />
			</div>
			{confirmation ? (
				<Modal
					show={confirmation}
					onClose={() => setConfirmation(false)}
					width={550}
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
		</div>
	);
}

export default Quotation;
