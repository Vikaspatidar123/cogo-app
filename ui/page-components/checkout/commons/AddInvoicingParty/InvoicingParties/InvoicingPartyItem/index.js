import { CheckboxGroup, Modal, Tooltip, cl } from '@cogoport/components';
import { IcMInfo, IcMHome } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React, { useMemo } from 'react';

import styles from './styles.module.css';

import { CountrySpecificData } from '@/ui/commons/constants/CountrySpecificDetail';

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
		rejection_reason = '',
	} = item || {};

	const { is_tax_applicable = false } = organization || {};
	const options = useMemo(() => (
		(is_tax_applicable ? billing_addresses : other_addresses) || []
	).map((billingAddress, index) => {
		const {
			id, address = '', is_sez = false,
			tax_number = '',
			verification_status: is_sez_verification_status = 'pending',
		} = billingAddress || {};

		return {
			label: (
				<div className={styles.label_container} key={id} id={`checkout_invoicing_party_${index}`}>
					<div className={styles.address_align}>
						<div className={styles.icon_wrapper}>
							<IcMHome />
						</div>
						<div className={styles.address_text}>{address}</div>
					</div>
					{is_sez && (
						<div className={styles.tag_div}>
							<div className={styles.tag_container}>
								<div className={cl`${styles.is_sez_verification_status} ${styles.tag}`}>
									SEZ verification is
									{startCase(is_sez_verification_status)}
								</div>
							</div>
							{is_sez_verification_status === 'rejected'
							&& rejection_reason && (
								<Tooltip
									placement="top"
									theme="light-border"
									content={startCase(rejection_reason)}
								>
									<div>
										<IcMInfo height="10px" width="10px" fill="#FF0000" />
									</div>
								</Tooltip>
							)}
						</div>
					)}
					<div className={styles.gst_number}>
						<CountrySpecificData
							country_id={country_id}
							accessorType="registration_number"
							accessor="label"
						/>
						Number :
						{tax_number || 'Not Applicable'}
					</div>
				</div>
			),
			value: id,
		};
	}), [billing_addresses, country_id, is_tax_applicable, other_addresses, rejection_reason]);

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
			<Modal.Body>
				<div className={styles.label}>
					<div className={styles.business_name}>{business_name}</div>
					{verification_status && (
						<div className={styles.tag_container}>
							<div className={`${styles.tag} ${styles[verification_status]}`}>{verification_status}</div>
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

				<div className={cl`${styles.radio_wrapper}
				 ${['rejected', 'pending'].includes(verification_status) && styles.disabled}`}
				>
					<CheckboxGroup
						options={options}
						value={value}
						onChange={() => handleChange()}
						disabled={['rejected', 'pending'].includes(verification_status)}
						optionsDisabled={optionsDisabled}
						multiple
						key={value}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div
					className={styles.add_address}
					role="presentation"
					onClick={() => onClickAddAddress()}
				>
					+ Add Address
				</div>
			</Modal.Footer>
		</div>
	);
}

export default InvoicingPartyItem;
