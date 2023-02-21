import { useState, useEffect } from 'react';
import { isEmpty } from '@cogoport/front/utils';
import { useTranslation } from 'next-i18next';
import { Button } from '@cogoport/components';
import useRequest from '@/temp/request/useRequest';
import EmptyState from '@/commons/components/EmptyState';
import InvoicingPartyItem from './InvoicingPartyItem';
import Spinner from '../../Spinner';
import CreateNewBillingAddress from '../CreateNewBillingAddress';
import CreateNewInvoicingParty from '../CreateNewInvoicingParty';
import styles from './styles.module.css';

const tradePartyType = {
	key: 'paying_party',
	label: 'PAYING PARTY',
	value: 'paying_party',
};
const translationKey = 'common:components.addInvoicingParty.invoicingParties.';

function InvoicingParties({
	organization = {},
	disabledParties = [],
	updateInvoicingParty = () => {},
	bookingType = 'self',
}) {
	const { id: organizationId = '' } = organization;

	const [valuesState, setValuesState] = useState([]);
	const [optionsDisabledState, setOptionsDisabledState] = useState({});

	const [showComponent, setShowComponent] = useState('view_billing_addresses');
	const [invoiceToTradePartyDetails, setInvoiceToTradePartyDetails] = useState(
		{},
	);

	const { t } = useTranslation(['common']);

	const params = {
		filters: {
			organization_id: organizationId,
			status: 'active',
			trade_party_type: bookingType,
		},
		pagination_data_required: false,
		billing_addresses_data_required: true,
		documents_data_required: true,
		other_addresses_data_required: true,
	};

	const api = useRequest('get', true)('/list_organization_invoicing_parties', {
		params,
	});

	const getOrganizationInvoicingParties = async () => {
		try {
			await api.trigger({ params });
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getOrganizationInvoicingParties();
	}, [bookingType]);

	const { loading = false } = api;
	const list = (api.data || {}).list || [];

	const newList = list.filter((item) => !isEmpty(item.billing_addresses));
	const isListEmpty = isEmpty(newList);

	useEffect(() => {
		if (loading || list.length === 0) {
			return;
		}

		const values = [];
		const optionsDisabled = {};

		list.forEach((item) => {
			(item.billing_addresses || []).forEach((billingAddress) => {
				const { id = '', tax_number = '' } = billingAddress;

				const isTaxNumberSelected = disabledParties.includes(tax_number);

				if (isTaxNumberSelected) {
					values.push(id);
				}

				optionsDisabled[id] = isTaxNumberSelected;
			});
		});

		setValuesState(values);
		setOptionsDisabledState(optionsDisabled);
	}, [loading]);

	const handleChange = (newValue) => {
		setValuesState(newValue);

		const newSelectedBillingAddressId = newValue[newValue.length - 1];

		const invoicingParty = list.find((item) => {
			const billingAddresses = item.billing_addresses || [];

			const isBillingAddressPresent = billingAddresses.some(
				(billingAddress) => {
					return billingAddress.id === newSelectedBillingAddressId;
				},
			);

			return isBillingAddressPresent;
		});

		const selectedBillingAddress = invoicingParty?.billing_addresses.find(
			(billingAddress) => {
				return billingAddress.id === newSelectedBillingAddressId;
			},
		);

		const {
			organization_id = '',
			address = '',
			name = '',
			tax_number = '',
			pincode = '',
			is_sez,
			// poc_details = [],
			organization_trade_party_id,
		} = selectedBillingAddress;

		const obj = {
			id: newSelectedBillingAddressId,
			name,
			business_name: invoicingParty.business_name,
			organization_id,
			organization_country_id: invoicingParty.country_id,
			tax_number,
			address,
			pincode,
			is_sez: !!is_sez,
			poc: null, // poc_details,
			trade_party_type: invoicingParty.trade_party_type,
			organization_trade_party_id,
			registration_number: invoicingParty.registration_number,
		};

		updateInvoicingParty({ ...obj });
	};

	const renderList = () => {
		const currentInvoicingParty =
			bookingType === 'self'
				? t(
						`${translationKey}mainComponent.list.currentInvoicingParty.billingAddress`,
				  )
				: t(
						`${translationKey}mainComponent.list.currentInvoicingParty.tradeParty`,
				  );

		if (loading) {
			return (
				<Spinner
					size={60}
					borderWidth={6}
					spinBorderColor="#356efd"
					outerBorderColor="#e7efff"
					loadingText={`${t(
						`${translationKey}mainComponent.list.spinner.loadingText`,
					)} ${currentInvoicingParty}...`}
				/>
			);
		}

		if (isListEmpty) {
			const emptyState = (
				<EmptyState
					height={240}
					width={240}
					bottomText={`${t(
						`${translationKey}mainComponent.list.emptyState.bottomText.1`,
					)} ${currentInvoicingParty} ${t(
						`${translationKey}mainComponent.list.emptyState.bottomText.2`,
					)}`}
				/>
			);

			if (bookingType === 'self') {
				return (
					<div className={styles.empty_content}>
						{emptyState}

						<div>
							<div
								role="presentation"
								className={styles.btn}
								onClick={() => {
									setShowComponent('create_billing_address');
									setInvoiceToTradePartyDetails((previousState) => ({
										...previousState,
										tradePartyId: organization.organization_trade_party_id,
									}));
								}}
							>
								{t(`${translationKey}mainComponent.list.buttons.addAddress`)}
							</div>
						</div>
					</div>
				);
			}

			return null;
		}

		return newList.map((item) => (
			<InvoicingPartyItem
				key={item}
				item={item}
				value={valuesState}
				handleChange={handleChange}
				optionsDisabled={optionsDisabledState}
				setShowComponent={setShowComponent}
				setInvoiceToTradePartyDetails={setInvoiceToTradePartyDetails}
				t={t}
			/>
		));
	};

	const renderAdditionalItems = () => {
		const buttonComponent = (
			<Button onClick={() => setShowComponent('create_trade_party')}>
				{t(`${translationKey}additionalItems.buttons.addTradeParty`)}
			</Button>
		);

		if (bookingType === 'self' || showComponent !== 'view_billing_addresses') {
			return null;
		}

		if (isListEmpty) {
			return (
				<div className={styles.empty_content}>
					<EmptyState
						height={240}
						width={240}
						bottomText={t(
							`${translationKey}additionalItems.buttons.emptyState.bottomText`,
						)}
					/>

					<div>{buttonComponent}</div>
				</div>
			);
		}

		return <div className={styles.trade_party_header}>{buttonComponent}</div>;
	};

	const renderMainComponent = () => {
		if (showComponent === 'view_billing_addresses') {
			return renderList();
		}

		if (showComponent === 'create_billing_address') {
			return (
				<CreateNewBillingAddress
					organizationDetails={organization}
					setShowComponent={setShowComponent}
					refetch={getOrganizationInvoicingParties}
					invoiceToTradePartyDetails={invoiceToTradePartyDetails}
					setInvoiceToTradePartyDetails={setInvoiceToTradePartyDetails}
				/>
			);
		}

		if (showComponent === 'create_trade_party') {
			return (
				<CreateNewInvoicingParty
					orgResponse={organization}
					setShowComponent={setShowComponent}
					tradePartyType={tradePartyType}
					fetchOrganizationTradeParties={getOrganizationInvoicingParties}
					viewType="from_checkout"
				/>
			);
		}

		return null;
	};

	return (
		<>
			{renderAdditionalItems()}
			{renderMainComponent()}
		</>
	);
}

export default InvoicingParties;
