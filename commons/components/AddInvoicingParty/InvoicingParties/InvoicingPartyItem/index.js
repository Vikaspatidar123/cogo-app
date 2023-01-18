import { useMemo } from 'react';
import { RadioGroup } from '@cogoport/front/components/admin';
import {
	Container,
	BusinessName,
	RadioWrapper,
	IconWrapper,
	AddressText,
	GstNumber,
	LabelContainer,
	AddressAlign,
	AddAddress,
} from './styles';
import AddressSvg from '../../assets/ic-address.svg';

function InvoicingPartyItem({
	item = {},
	value = '',
	handleChange = () => {},
	optionsDisabled = {},
	setShowComponent = () => {},
	setInvoiceToTradePartyDetails = () => {},
}) {
	const {
		id: tradePartyId,
		billing_addresses,
		business_name,
		country_id,
		registration_number,
	} = item;

	const options = useMemo(() => {
		return (billing_addresses || []).map((billingAddress, index) => {
			const { id, address = '', tax_number = '' } = billingAddress;

			return {
				label: (
					<LabelContainer key={id} id={`checkout_invoicing_party_${index}`}>
						<AddressAlign>
							<IconWrapper>
								<AddressSvg />
							</IconWrapper>
							<AddressText>{address}</AddressText>
						</AddressAlign>
						<GstNumber>TAX/GST Number : {tax_number}</GstNumber>
					</LabelContainer>
				),
				value: id,
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
		<Container>
			<BusinessName>{business_name}</BusinessName>

			<RadioWrapper>
				<RadioGroup
					className="primary lg"
					options={options}
					value={value}
					onChange={handleChange}
					optionsDisabled={optionsDisabled}
					multiple
				/>
			</RadioWrapper>

			<AddAddress onClick={() => onClickAddAddress()}>+ Add Address</AddAddress>
		</Container>
	);
}

export default InvoicingPartyItem;
