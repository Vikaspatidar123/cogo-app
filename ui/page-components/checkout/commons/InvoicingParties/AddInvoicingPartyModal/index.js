import AddInvoicingParty from '../../AddInvoicingParty';

function AddInvoicingPartyModal({
	setShow,
	organization,
	invoicingParties,
	onSelectInvoicingParty,
	primary_service,
	source,
	isOrgCountryInvoicesRequired = false,
	setShowWarning = () => {},
	showCargoInsuranceIP = false,
	setShowCargoInsuranceIP = () => {},
}) {
	const disabledInvoicingParties = invoicingParties.map((invoicingParty) => invoicingParty.tax_number);

	const isInvoicingPartiesSaved = invoicingParties.every((invoicingParty) => invoicingParty.state.isSaved);

	return (
		<AddInvoicingParty
			isOrgCountryInvoicesRequired={
				isOrgCountryInvoicesRequired || showCargoInsuranceIP
			}
			organizationDetails={organization}
			primary_service={primary_service}
			disabledParties={disabledInvoicingParties}
			updateInvoicingParty={(selectedBillingAddress) => {
				onSelectInvoicingParty({
					selectedInvoicingParty: selectedBillingAddress,
					...(isOrgCountryInvoicesRequired && {
						serviceTypeKey: 'cargo_insurance',
					}),
				});
				setShow(false);
				setShowWarning(false);
				setShowCargoInsuranceIP(false);
			}}
			disabledAddInvoicingPartyButton={!isInvoicingPartiesSaved}
			source={source}
			showCargoInsuranceIP={showCargoInsuranceIP}
			setShowCargoInsuranceIP={setShowCargoInsuranceIP}
		/>
	);
}

export default AddInvoicingPartyModal;
