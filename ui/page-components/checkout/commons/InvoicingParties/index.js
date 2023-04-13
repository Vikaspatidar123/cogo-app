import { isEmpty } from '@cogoport/utils';

import AddInvoicingPartyModal from './AddInvoicingPartyModal';
import SelectedAddressList from './SelectedAddressList';
import styles from './styles.module.css';
import useInvoicingParties from './useInvoicingParties';

import EmptyState from '@/ui/commons/components/EmptyState';

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
	// console.log(organization, 'organization');
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
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>Invoicing Party</div>
			</div>

			<div className={styles.selected_address_list_container}>
				{invoicingParties.length === 0 ? (
					<EmptyState
						height="200px"
						width="100%"
						message="No billing addresses/invoicing parties found, add to proceed"
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
							onChangeInvoicingPartyCurrency={(invoiceCurrency) => onChangeInvoicingPartyCurrency(
								{ id, invoiceCurrency },
							)}
							onChangeService={(serviceId) => onChangeInvoicingPartyServices(
								{ invoicingParty, serviceId },
							)}
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
			</div>

			<AddInvoicingPartyModal
				setShow={setShowAddInvoicingPartyModal}
				primary_service={primary_service}
				organization={organization}
				invoicingParties={invoicingParties}
				onSelectInvoicingParty={onSelectInvoicingParty}
				source={source}
			/>
		</div>
	);
}

export default InvoicingParties;
