import { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { IcMInfo } from '@cogoport/icons-react';
import { CheckboxGroup, Tags, Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/front/utils';
import styles from './styles.module.css';
import AddressSvg from '../../assets/ic-address.svg';

const translationKey =
	'common:components.addInvoicingParty.invoicingParties.invoicingPartyItem.';

function InvoicingPartyItem({
	item = {},
	value = '',
	handleChange = () => {},
	optionsDisabled = {},
	setShowComponent = () => {},
	setInvoiceToTradePartyDetails = () => {},
}) {
	const { t } = useTranslation(['common']);
	const {
		id: tradePartyId,
		billing_addresses,
		business_name,
		country_id,
		registration_number,
		verification_status = '',
	} = item;

	const options = useMemo(() => {
		return (billing_addresses || []).map((billingAddress, index) => {
			const { id, address = '', tax_number = '' } = billingAddress;

			return {
				label: (
					<div
						className={styles.label_container}
						key={id}
						id={`checkout_invoicing_party_${index}`}
					>
						<div className={styles.address_align}>
							<div className={styles.icon_wrapper}>
								<AddressSvg />
							</div>
							<div className={styles.address_text}>{address}</div>
						</div>
						<div className={styles.gst_number}>
							{t(`${translationKey}gstNumberLabel`)} : {tax_number}
						</div>
					</div>
				),
				value: id,
				disabled:
					['rejected', 'pending'].includes(verification_status) ||
					optionsDisabled[id],
			};
		});
	}, []);

	const onClickAddAddress = () => {
		setShowComponent('create_billing_address');
		setInvoiceToTradePartyDetails((previousDetails) => ({
			...previousDetails,
			tradePartyId,
			countryId: country_id,
			registrationNumber: registration_number,
		}));
	};

	return (
		<div className={styles.container}>
			<div className={styles.label}>
				<div className={styles.business_name}>{business_name}</div>
				{verification_status && (
					<div className={styles.tag_container}>
						<Tags
							key={verification_status}
							className={styles[verification_status]}
							items={[
								{
									disabled: false,
									children: startCase(verification_status),
									tooltip: false,
									closable: false,
								},
							]}
							size="sm"
						/>

						<Tooltip
							content={t(`${translationKey}verificationStatusInfo`)}
							placement="top"
							caret={false}
						>
							{verification_status === 'pending' && (
								<div>
									<IcMInfo className="image" fill="red" />
								</div>
							)}
						</Tooltip>
					</div>
				)}
			</div>

			<div className={styles.radio_wrapper}>
				<CheckboxGroup
					options={options}
					value={value}
					onChange={handleChange}
				/>
			</div>

			<div
				role="presentation"
				className={styles.add_address}
				onClick={() => onClickAddAddress()}
			>
				{t(`${translationKey}addAddressText`)}
			</div>
		</div>
	);
}

export default InvoicingPartyItem;
