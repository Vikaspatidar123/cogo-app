/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useMemo } from 'react';

import CreateNewBillingAddress from '../CreateNewBillingAddress';
import CreateNewInvoicingParty from '../CreateNewInvoicingParty';

import InvoicingPartyItem from './InvoicingPartyItem';
import styles from './styles.module.css';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';
import EmptyState from '@/ui/commons/components/EmptyState';
import { APP_EVENT, trackEvent } from '@/ui/commons/constants/analytics';
import isCargoInsuranceApplicable from '@/ui/commons/utils/getCargoInsuranceApplicability';

const tradePartyType = {
	key   : 'paying_party',
	label : 'PAYING PARTY',
	value : 'paying_party',
};

const getOrgCountryOtherAddresses = ({ newList = [] }) => {
	const filteredNewList = [];

	newList.forEach((addressItem) => {
		const otherAddresses = (addressItem.other_addresses || []).filter(
			(address) => isCargoInsuranceApplicable({
				country_id: address?.country_id,
			}),
		);

		if (isEmpty(otherAddresses)) {
			return;
		}

		filteredNewList.push({
			...addressItem,
			other_addresses: otherAddresses,
		});
	});

	return filteredNewList;
};

const getOrgCountryBillingAddresses = ({ newList = [] }) => {
	const filteredNewList = newList.filter((item) => isCargoInsuranceApplicable({
		country_id: item?.country_id,
	}));

	return filteredNewList;
};
function InvoicingParties({
	organization = {},
	primary_service,
	disabledParties = [],
	updateInvoicingParty = () => {},
	bookingType = 'self',
	onClose = () => {},
	isIE,
	source,
	isOrgCountryInvoicesRequired,
}) {
	const {
		general: { query },
	} = useSelector((state) => state);
	const { checkout_id } = query || {};

	const { id: organizationId = '', is_tax_applicable = false } = organization;

	const [valuesState, setValuesState] = useState([]);
	const [optionsDisabledState, setOptionsDisabledState] = useState({});

	const [showComponent, setShowComponent] = useState(
		'view_billing_addresses',
	);

	const [invoiceToTradePartyDetails, setInvoiceToTradePartyDetails] = useState({});

	const params = {
		filters: {
			organization_id  : organizationId,
			status           : 'active',
			trade_party_type : bookingType,
		},
		pagination_data_required        : false,
		billing_addresses_data_required : true,
		documents_data_required         : true,
		other_addresses_data_required   : true,
	};

	const [{ loading, data }, trigger] = useRequest(
		{
			url    : 'list_organization_invoicing_parties',
			method : 'get',
			params : { params },
		},
		{ manual: true },
	);
	const getOrganizationInvoicingParties = () => {
		trigger({ params });
	};
	useEffect(() => {
		getOrganizationInvoicingParties();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [bookingType]);

	const { list = [] } = data || {};

	const reorderedList = useMemo(() => list || [], [list]);

	const address_to_use = is_tax_applicable
		? 'billing_addresses'
		: 'other_addresses';

	useEffect(() => {
		if (loading || list.length === 0) {
			return;
		}

		const values = [];
		const optionsDisabled = {}; // optionsDisabled only for billing_addresses
		const igstValues = {};
		list.forEach((item, index) => {
			const billingAddresses = [];
			(item.billing_addresses || []).forEach((billingAddress) => {
				const {
					id = '',
					tax_number = '',
					is_sez = false,
					verification_status = 'pending_from_approval',
				} = billingAddress;

				const isTaxNumberSelected = disabledParties.includes(tax_number);

				if (
					isTaxNumberSelected
					&& ['verified', 'pending'].includes(verification_status)
				) {
					values.push(id);
					billingAddresses.push(billingAddress);
				}

				optionsDisabled[id] = isTaxNumberSelected;

				if (
					is_sez
					&& ['rejected', 'pending_from_approval'].includes(verification_status)
				) {
					optionsDisabled[id] = true;
				}
			});

			const billingAddressesIds = billingAddresses.map(
				(billingAddress) => billingAddress.id,
			);

			reorderedList[index].billing_addresses = [
				...billingAddresses,
				...(item.billing_addresses || []).filter(
					(billingAddress) => !billingAddressesIds.includes(billingAddress.id),
				),
			];

			igstValues.cogo_entity_id = item?.cogo_entity_id;
			igstValues.country_id = item?.country_id;
		});

		setValuesState(values);
		setOptionsDisabledState(optionsDisabled);
	}, [loading]);

	const handleChange = (newValue = []) => {
		setValuesState(newValue);

		const newSelectedAddressId = newValue[newValue.length - 1];

		const invoicingParty = list.find((item) => {
			const allAddresses = item[address_to_use] || [];

			const isAddressPresent = allAddresses.some(
				(address) => address.id === newSelectedAddressId,
			);

			return isAddressPresent;
		});

		const tax_mechanism = (invoicingParty?.tax_mechanism || []).filter(
			(item) => {
				if (primary_service === item?.service_type) {
					return item;
				}
				return null;
			},
		);

		const selectedAddress = (invoicingParty?.[address_to_use] || []).find(
			(address) => address.id === newSelectedAddressId,
		);

		const EVENT = APP_EVENT;
		trackEvent(EVENT.checkout_changed_invoicing_parties, {
			checkout_id,
			invoicing_parties: [
				{
					name     : selectedAddress?.name,
					poc_name : selectedAddress?.poc_details?.name,
				},
			],
		});

		const {
			organization_id = '',
			address = '',
			name = '',
			tax_number = '',
			pincode = '',
			is_sez,
			id,
			organization_pocs = [],
			// poc_details = [],
			organization_trade_party_id,
			country_id,
		} = selectedAddress || {};

		const defaultPoc = organization_pocs?.[0] || {};
		let primary_poc;
		if (!isEmpty(defaultPoc)) {
			const {
				email,
				mobile_number,
				name: pocName,
				id: pocId,
				mobile_country_code,
			} = defaultPoc;
			primary_poc = {
				name : pocName,
				id   : pocId,
				email,
				mobile_number,
				mobile_country_code,
			};
		}

		const obj = {
			country_id              : country_id || invoicingParty?.country_id,
			name,
			business_name           : invoicingParty?.business_name,
			organization_id,
			organization_country_id : invoicingParty?.country_id,
			tax_number,
			tax_mechanism           : tax_mechanism?.[0]?.mechanism_type,
			address,
			pincode,
			billing_address_id      : id,
			is_sez                  : !!is_sez,
			poc                     : primary_poc, // poc_details,
			trade_party_type        : invoicingParty?.trade_party_type,
			organization_trade_party_id,
			registration_number     : invoicingParty?.registration_number,
		};

		updateInvoicingParty({ ...obj });

		onClose();
	};

	const renderList = () => {
		if (loading) {
			return (
				<div className={styles.loading}>
					<div>
						<Loader themeType="primary" style={{ width: '80%' }} />
						<div>loading...</div>
					</div>
				</div>
			);
		}

		const newList = reorderedList.filter(
			(item) => !isEmpty(item[address_to_use] || []),
		);
		let filteredNewList = newList;
		if (isOrgCountryInvoicesRequired) {
			filteredNewList = address_to_use === 'other_addresses'
				? getOrgCountryOtherAddresses({
					newList,
				})
				: getOrgCountryBillingAddresses({ newList });
		}

		if (isEmpty(filteredNewList)) {
			if (bookingType === 'self') {
				return (
					<>
						<Button
							onClick={() => {
								setShowComponent('create_billing_address');
								setInvoiceToTradePartyDetails((previousState) => ({
									...previousState,
									tradePartyId: organization.organization_trade_party_id,
								}));
							}}
							style={{ margin: 16 }}
						>
							Add Address
						</Button>

						<EmptyState heading="address" />
					</>
				);
			}

			return (
				<EmptyState
					heading="address"
					message="No address found
			"
				/>
			);
		}
		return filteredNewList.map((item) => (
			<InvoicingPartyItem
				key={item.id}
				item={item}
				value={valuesState}
				organization={organization}
				handleChange={handleChange}
				optionsDisabled={optionsDisabledState}
				isIE={isIE}
				setShowComponent={setShowComponent}
				setInvoiceToTradePartyDetails={setInvoiceToTradePartyDetails}
			/>
		));
	};

	const renderAdditionalItems = () => {
		if (bookingType === 'self' || showComponent !== 'view_billing_addresses') {
			return null;
		}

		return (
			<div className={styles.trade_party_header}>
				<Button
					onClick={() => setShowComponent('create_trade_party')}
					style={{ marginLeft: 16 }}
				>
					Add New Trade Party
				</Button>
			</div>
		);
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
					setInvoiceToTradePartyDetails={
					setInvoiceToTradePartyDetails
                    }
				/>
			);
		}

		if (showComponent === 'create_trade_party') {
			return (
				<CreateNewInvoicingParty
					orgResponse={organization}
					setShowComponent={setShowComponent}
					tradePartyType={tradePartyType}
					fetchOrganizationTradeParties={
					getOrganizationInvoicingParties
                    }
					viewType="from_checkout"
					source={source}
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
