import { Button, Modal } from '@cogoport/components';
import { useState } from 'react';

import useUpdateCheckoutService from '../../../hooks/useUpdateCheckoutService';
import AddInvoicingPartyModal from '../AddInvoicingPartyModal';

import styles from './styles.module.css';

import getCountryDetails from '@/ui/commons/utils/getCountryDetails';

function DeleteCargoInsuranceService({
	detail = {},
	refetchGetCheckout = () => {},
	filteredServicesInvoiceTo = [],
}) {
	const [visible, setVisible] = useState(false);

	const { handleDeleteRate, deleteRateLoading } = useUpdateCheckoutService({
		detail,
		checkout_id : detail.id,
		refetch     : refetchGetCheckout,
	});

	return (
		<div>
			<Button
				className="primary md"
				onClick={() => setVisible(!visible)}
				style={{ margin: '4px' }}
				type="button"
			>
				<div>Remove Cargo Insurance</div>
			</Button>

			<Modal
				show={visible}
				position="top-right"
				onClose={() => setVisible(false)}
				width={400}
				onOuterClick={() => setVisible(false)}
			>
				<div>
					<div style={{ fontWeight: '500', fontSize: '16px' }}>
						Are you sure?
						<div>You want to remove Cargo Insurance Service.</div>
					</div>

					<div className={styles.flex} style={{ marginTop: '16px' }}>
						<Button
							className="primary sm"
							type="button"
							onClick={() => setVisible((prev) => !prev)}
							disabled={deleteRateLoading}
						>
							Cancel
						</Button>
						<Button
							className="secondary sm"
							type="button"
							style={{ marginLeft: '16px' }}
							onClick={() => {
								handleDeleteRate({
									service_type : 'cargo_insurance',
									id           : filteredServicesInvoiceTo[0]?.service_id,
								});
								setVisible(false);
							}}
							loading={deleteRateLoading}
						>
							Remove
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

function DeleteAndAddIpCargoInsurance({
	setShow,
	primary_service,
	organization,
	invoicingParties,
	onSelectInvoicingParty,
	source,
	detail,
	refetchGetCheckout,
	filteredServicesInvoiceTo = [],
}) {
	const { importer_exporter } = detail || {};

	const orgCountryId =		importer_exporter?.country_id || importer_exporter?.country?.id;

	const countryDetails = getCountryDetails({ country_id: orgCountryId });

	return (
		<div className={styles.cargo_insurance_container}>
			<div className={styles.info_container}>
				Note:- You have selected Cargo Insurance service for shipment. To
				continue, please select an invoicing party registered in
				{' '}
				{countryDetails?.name}
				{' '}
				for this service.
			</div>

			<div
				className={styles.flex}
				style={{
					marginTop      : '16px',
					justifyContent : 'flex-start',
				}}
			>
				<DeleteCargoInsuranceService
					detail={detail}
					refetchGetCheckout={refetchGetCheckout}
					filteredServicesInvoiceTo={filteredServicesInvoiceTo}
				/>

				<div style={{ width: '250px', marginLeft: '16px' }}>
					<AddInvoicingPartyModal
						setShow={setShow}
						primary_service={primary_service}
						organization={organization}
						invoicingParties={invoicingParties}
						onSelectInvoicingParty={onSelectInvoicingParty}
						source={source}
						isOrgCountryInvoicesRequired
					/>
				</div>
			</div>
		</div>
	);
}

export default DeleteAndAddIpCargoInsurance;
