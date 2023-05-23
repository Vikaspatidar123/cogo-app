import { CheckboxGroup, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useMemo } from 'react';

import styles from './styles.module.css';

function InvoicingPartyItem({
	organization = {},
	item = {},
	value = '',
	handleChange = () => {},
	optionsDisabled = {},
	isIE = false,
	setShowComponent = () => {},
	setInvoiceToTradePartyDetails = () => {},
}) {
	const {
		id: tradePartyId,
		billing_addresses,
		business_name,
		country_id,
		registration_number,
		other_addresses,
		verification_status = '',
	} = item;

	const { is_tax_applicable = false } = organization;

	const options = useMemo(() => (
		(is_tax_applicable ? billing_addresses : other_addresses) || []
	).map((billingAddress, index) => {
		const { id, address = '', tax_number = '' } = billingAddress;

		return {
			label: (
				<div className={styles.label_container} key={id} id={`checkout_invoicing_party_${index}`}>
					<div className={styles.address_align}>
						<div className={styles.icon_wrapper}>
							{/* <AddressSvg /> */}
						</div>
						<div className={styles.address_text}>{address}</div>
					</div>

					<div className={styles.gst_number}>
						TAX/GST Number :
						{' '}
						{tax_number || 'Not Applicable'}
					</div>
				</div>
			),
			value: id,
		};
	}), [billing_addresses, is_tax_applicable, other_addresses]);

	const onClickAddAddress = () => {
		setShowComponent('create_billing_address');
		setInvoiceToTradePartyDetails((previousDetails) => ({
			...previousDetails,
			tradePartyId,
			countryId          : country_id,
			registrationNumber : registration_number,
		}));
	};
	return (
		<div className={`${styles.container} ${isIE ? 'ie' : ''}`}>
			<div className={styles.label}>
				<div className={styles.business_name}>{business_name}</div>
				{verification_status && (
					<div className={styles.tag_container}>
						<div className={`${styles.Tag} ${styles.verification_status}`}>{verification_status}</div>
						<Tooltip
							content={(
								<div>
									Please provide a proof of agreement that verifies the trade
									party&apos;s authorization to make payment on behalf of the
									Booking party.
									{' '}
								</div>
							)}
							placement="top"
							caret={false}
						>
							{verification_status === 'pending' && (
								<div>
									<IcMInfo
										className="image"
										fill="red"
										height={16}
										width={16}
									/>
								</div>
							)}
						</Tooltip>
					</div>
				)}
			</div>

			<div className={styles.radio_wrapper}>
				<CheckboxGroup
					className="primary lg"
					options={options}
					value={value}
					onChange={handleChange}
					disabled={['rejected', 'pending'].includes(verification_status)}
					optionsDisabled={optionsDisabled}
					multiple
				/>
			</div>

			<div
				className={styles.add_address}
				role="presentation"
				onClick={() => onClickAddAddress()}
			>
				+ Add Address
			</div>
		</div>
	);
}

export default InvoicingPartyItem;
