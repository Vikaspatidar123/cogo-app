import EmptyState from '@cogo/commons/EmptyState';
import { isEmpty } from '@cogoport/front/utils';

import AddInvoicingPartyModal from './AddInvoicingPartyModal';
import SelectedAddressList from './SelectedAddressList';
import {
	Container,
	Header,
	Title,
	SelectedAddressListContainer,
} from './styles';
import useInvoicingParties from './useInvoicingParties';

function InvoicingParties(props) {
	const {
		organization,
		primary_service,
		rate,
		conversions,
		detail = {},
		invoice = {},
		source = '',
	} = props;

	if (isEmpty(organization)) {
		return null;
	}

	const {
		savedServicesInvoiceTo,
		invoicingParties,
		setShowAddInvoicingPartyModal,
		onSelectInvoicingParty,
		setShowHiddenContent,
		onChangeInvoicingPartyCurrency,
		onChangeInvoicingPartyServices,
		deleteInvoicingParty,
		saveInvoicingPartiesServicesAndInvoiceCurrency,
		loading,
		paymentModes,
		setPaymentModes,
	} = useInvoicingParties(props);

	return (
		<Container>
			<Header>
				<Title>Invoicing Party</Title>
			</Header>

			<SelectedAddressListContainer>
				{invoicingParties.length === 0 ? (
					<EmptyState
						height="200px"
						width="100%"
						bottomText="No billing addresses/invoicing parties found, add to proceed"
					/>
				) : null}

				{invoicingParties.map((invoicingParty, index) => {
					const { id } = invoicingParty;

					return (
						<SelectedAddressList
							key={id}
							savedServicesInvoiceTo={savedServicesInvoiceTo}
							invoicingParties={invoicingParties}
							invoicingParty={invoicingParty}
							setShowHiddenContent={(action) => setShowHiddenContent({ id, action })}
							onChangeInvoicingPartyCurrency={(invoiceCurrency) => onChangeInvoicingPartyCurrency({ id, invoiceCurrency })}
							onChangeService={(serviceId) => onChangeInvoicingPartyServices({ invoicingParty, serviceId })}
							deleteInvoicingParty={() => {
								deleteInvoicingParty({ invoicingParty });
							}}
							saveInvoicingParty={
							saveInvoicingPartiesServicesAndInvoiceCurrency
							}
							loading={loading}
							marginBottom={index === invoicingParties.length - 1 ? 0 : '16px'}
							detail={detail}
							rate={rate}
							conversions={conversions}
							invoice={invoice}
							paymentModes={paymentModes}
							setPaymentModes={setPaymentModes}
							source={source}
						/>
					);
				})}
			</SelectedAddressListContainer>

			<AddInvoicingPartyModal
				setShow={setShowAddInvoicingPartyModal}
				primary_service={primary_service}
				organization={organization}
				invoicingParties={invoicingParties}
				onSelectInvoicingParty={onSelectInvoicingParty}
				source={source}
			/>
		</Container>
	);
}

export default InvoicingParties;
