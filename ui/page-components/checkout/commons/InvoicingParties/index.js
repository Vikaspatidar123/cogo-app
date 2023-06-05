/* eslint-disable react-hooks/rules-of-hooks */
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import AddInvoicingPartyModal from './AddInvoicingPartyModal';
import SelectedAddressList from './SelectedAddressList';
import styles from './styles.module.css';
import useInvoicingParties from './useInvoicingParties';

import EmptyState from '@/ui/commons/components/EmptyState';
import isCargoInsuranceApplicable from '@/ui/commons/utils/getCargoInsuranceApplicability';

function InvoicingParties(props) {
	const {
		organization,
		primary_service,
		rate,
		conversions,
		detail = {},
		invoice = {},
		source = 'app',
		showCargoInsuranceIP,
		setShowCargoInsuranceIP = () => {},
		setNoIpCargoInsurance = () => {},
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

	const allServices = invoicingParties.flatMap((invoicingParty) => (
		invoicingParty.services.map((item) => item.service)));

	const newInvoicingParties = invoicingParties.map((invoicingParty) => {
		const {
			services,
			country_id: invoicing_party_country_id,
			organization_country_id,
		} = invoicingParty;

		const is_cargo_insurance_applicable = isCargoInsuranceApplicable({
			country_id: invoicing_party_country_id || organization_country_id,
		});

		let filteredServices = services.filter((item) => item.service !== 'cargo_insurance');

		if (is_cargo_insurance_applicable) {
			filteredServices = services;
		}

		return { ...invoicingParty, ...{ services: filteredServices } };
	});
	const newAllServices = newInvoicingParties.flatMap((invoicingParty) => (
		invoicingParty.services.map((item) => item.service)));

	const showCargoInsuranceInfo =		!newAllServices.includes('cargo_insurance')
		&& allServices.includes('cargo_insurance');

	useEffect(() => {
		setNoIpCargoInsurance(showCargoInsuranceInfo);
	}, [setNoIpCargoInsurance, showCargoInsuranceInfo]);
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
				invoicingParties={newInvoicingParties}
				onSelectInvoicingParty={onSelectInvoicingParty}
				source={source}
				showCargoInsuranceIP={showCargoInsuranceIP}
				setShowCargoInsuranceIP={setShowCargoInsuranceIP}
			/>
		</div>
	);
}

export default InvoicingParties;
