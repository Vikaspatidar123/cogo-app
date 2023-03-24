import AddInvoicingParty from '@cogo/business-modules/components/AddInvoicingParty';

function AddInvoicingPartyModal({
	setShow,
	organization,
	invoicingParties,
	onSelectInvoicingParty,
	primary_service,
	source,
}) {
	const disabledInvoicingParties = invoicingParties.map((invoicingParty) => invoicingParty.tax_number);

	const isInvoicingPartiesSaved = invoicingParties.every((invoicingParty) => invoicingParty.state.isSaved);

	return (
		<AddInvoicingParty
			organizationDetails={organization}
			primary_service={primary_service}
			disabledParties={disabledInvoicingParties}
			updateInvoicingParty={(selectedBillingAddress) => {
				onSelectInvoicingParty({
					selectedInvoicingParty: selectedBillingAddress,
				});
				setShow(false);
			}}
			disabledAddInvoicingPartyButton={!isInvoicingPartiesSaved}
			source={source}
		/>
	);
}

export default AddInvoicingPartyModal;
