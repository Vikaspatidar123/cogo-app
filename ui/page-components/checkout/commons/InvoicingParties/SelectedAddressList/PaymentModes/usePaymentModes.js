import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase, upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

import { useRequest } from '@/packages/request';

const PAYMENT_MODE_SHORT_FORM = {
	pre_approved_clean_credit : 'Pre Approved',
	paylater_clean_credit     : 'Paylater',
	paylater_rolling_credit   : 'Paylater',
};

const CREDIT_PAYMENT_TERMS_SHORT_FORM = {
	pre_approved_clean_credit : 'Pre Approved Clean Deferred Payment',
	paylater_clean_credit     : 'Paylater Clean Deferred Payment',
	paylater_rolling_credit   : 'Paylater Rolling Deferred Payment',
};

const getPaymentModeLabel = ({ payment_mode }) => {
	if (payment_mode === 'cash') {
		return startCase(payment_mode);
	}

	return 'Deferred Payment';
};

const getCreditPaymentTermsLabel = ({ payment_term }) => startCase(CREDIT_PAYMENT_TERMS_SHORT_FORM[payment_term]);

const getCreditLabel = ({ credit_data = {}, payment_term = '' }) => {
	const { available_credit_currency, available_credit } = credit_data || {};

	return (
		<Tooltip
			className="secondary sm"
			animation="shift-away"
			theme="light-border"
			content={available_credit && (
				<>
					All the decisions related to credit/cash invoices will be taken at
					sales invoice creation day. you seems to have credit limit &#45;
					outstanding &#43; on_account &#62; available credit limit, Please
					make sure you have sufficient credit limit at the time of sales
					invoice creation, otherwise, invoice will be created at cash
					automatically
				</>
			)}
		>
			<span
				style={{
					display       : 'flex',
					flexDirection : 'row',
					alignItems    : 'center',
				}}
			>
				{getCreditPaymentTermsLabel({ payment_term })}
				{available_credit
					? ` (Avl. bal: ${available_credit_currency} ${available_credit}) `
					: ''}
				{available_credit && <IcMInfo />}
			</span>
		</Tooltip>
	);
};

const getPaymentTermsLabel = ({ payment_term, detail }) => {
	const domestic_mapping = {
		prepaid : 'Pay at Origin',
		collect : 'Pay at Destination',
	};
	const cross_border_mapping = {
		prepaid : ' Pay at origin by shipper',
		collect : 'Pay at destination by consignee',
	};

	return (
		<Tooltip
			className="secondary sm"
			animation="shift-away"
			theme="light-border"
			content={
				detail?.trade_type === 'domestic'
					? domestic_mapping[payment_term]
					: cross_border_mapping[payment_term]
			}
		>
			<span style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
				{startCase(payment_term)}
				{' '}
				{'  '}
				<IcMInfo style={{ marginLeft: '4px' }} />
			</span>
		</Tooltip>
	);
};

let PAYMENT_TERMS = {};

let PAYMENT_METHODS = {};

const usePaymentModes = ({
	invoicingParty,
	detail = {},
	paymentModes = {},
	setPaymentModes = () => {},
}) => {
	const {
		paymentMode = 'cash',
		paymentTerms = '',
		paymentMethods = '',
	} = paymentModes[invoicingParty.id] || {};

	const {
		services = {},
		primary_service = '',
		trade_type = '',
		importer_exporter = {},
		existing_shipment_id = '',
	} = detail;

	const { cogo_entity_id = '' } = importer_exporter;

	const {
		destination_country_id = '',
		origin_country_id = '',
		rate = {},
		country_id = '',
	} = services[detail?.primary_service_id];

	const { rate_id = '' } = rate;

	const params = {
		origin_country_id      : origin_country_id || country_id,
		destination_country_id : destination_country_id || country_id,
		trade_party_ids        : [invoicingParty?.organization_trade_party_id],
		primary_service,
		trade_type,
		cogo_entity_id,
		rate_id,
		existing_shipment_id   : existing_shipment_id || undefined,
	};

	const [{ loading, data }] = useRequest({
		url    : 'get_organization_trade_party_payment_modes',
		method : 'get',
		params,
	}, { manual: true });

	const orgTradePartyId = invoicingParty?.organization_trade_party_id;

	const orgTradePartyData = data?.[orgTradePartyId] || {};

	const { modes = [] } = orgTradePartyData || {};

	let creditDetails = {};

	let options = (modes || []).map((mode) => {
		const { payment_mode = '', credit_details = {} } = mode || {};

		const { payment_terms = [] } = mode;

		const obj = {
			label: getPaymentModeLabel({
				payment_mode,
				payment_terms,
				credit_details,
			}),
			value: payment_mode,
		};

		const paymentTermsArr = [];

		(payment_terms || []).forEach((paymentTerm) => {
			const { payment_term = '' } = paymentTerm || {};

			const newObj = {
				label: Object.keys(PAYMENT_MODE_SHORT_FORM).includes(payment_term)
					? getCreditLabel({ credit_data: credit_details, payment_term })
					: getPaymentTermsLabel({ payment_term, detail }),
				value: payment_term,
			};

			const { payment_methods = [] } = paymentTerm || {};

			const paymentMethodsArr = [];

			(payment_methods || []).forEach((paymentMethod) => {
				const { payment_method = '' } = paymentMethod || {};

				const paymentMethodObj = {
					label: (
						<div className={styles.payment_method_label}>{upperCase(payment_method)}</div>
					),
					value: payment_method,
				};

				if (paymentMethod.is_active) {
					paymentMethodsArr.push(paymentMethodObj);
				}
			});

			PAYMENT_METHODS = {
				...PAYMENT_METHODS,
				[paymentTerm.payment_term]: paymentMethodsArr,
			};

			if (paymentTerm.is_active) {
				if (
					Object.keys(PAYMENT_MODE_SHORT_FORM).includes(
						paymentTerm.payment_term,
					)
				) {
					const { credit_days = 1, interest = 1 } = credit_details || {};

					creditDetails = {
						...creditDetails,
						credit_days,
						interest,
					};
				}

				paymentTermsArr.push(newObj);
			}
		});

		PAYMENT_TERMS = {
			...PAYMENT_TERMS,
			[mode.payment_mode]: paymentTermsArr,
		};

		return mode.is_active && obj;
	});

	options = options.filter((element) => element);

	const PAYMENT_MODES = [
		{
			title    : 'Mode of Payment',
			options,
			val      : paymentMode,
			span     : 3,
			onChange : (i) => {
				setPaymentModes((pv) => ({
					...pv,
					[invoicingParty.id]: {
						...pv[invoicingParty.id],
						...creditDetails,
						paymentMode  : i,
						paymentTerms : PAYMENT_TERMS?.[i]?.[0]?.value,
					},
				}));
			},
		},
		{
			title    : 'Terms of Payment',
			options  : PAYMENT_TERMS[paymentMode] || [],
			val      : paymentTerms,
			span     : 5,
			onChange : (i) => {
				setPaymentModes((pv) => ({
					...pv,
					[invoicingParty.id]: {
						...pv[invoicingParty.id],
						...creditDetails,
						paymentTerms   : i,
						paymentMethods : PAYMENT_METHODS?.[i]?.[0]?.value,
					},
				}));
			},
		},
		{
			title    : 'Methods of payment',
			options  : PAYMENT_METHODS[paymentTerms] || [],
			val      : paymentMethods,
			span     : 4,
			onChange : (i) => {
				setPaymentModes((pv) => ({
					...pv,
					[invoicingParty.id]: {
						...pv[invoicingParty.id],
						paymentMethods: i,
					},
				}));
			},
		},
	];

	return {
		loading,
		options,
		PAYMENT_TERMS,
		PAYMENT_METHODS,
		creditDetails,
		PAYMENT_MODES,
	};
};

export default usePaymentModes;
