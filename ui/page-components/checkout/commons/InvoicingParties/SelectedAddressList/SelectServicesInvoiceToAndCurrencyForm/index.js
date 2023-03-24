import { Checkbox, Button, Select } from '@cogoport/components';

import PaymentModes from '../PaymentModes';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const CURRENCY_OPTIONS = [
	GLOBAL_CONSTANTS.currency_code.USD,
	GLOBAL_CONSTANTS.currency_code.INR,
	GLOBAL_CONSTANTS.currency_code.VND,
].map((currencyCode) => ({
	label : currencyCode,
	value : currencyCode,
}));

function SelectServicesInvoiceToAndCurrencyForm({
	invoicingParties,
	savedServicesInvoiceTo,
	invoiceCurrency,
	services,
	onChangeInvoicingPartyCurrency,
	onChangeService,
	onClickCancelButton,
	saveInvoicingParty,
	loading,
	invoicingParty,
	detail,
	invoice,
	paymentModes,
	setPaymentModes = () => {},
}) {
	return (
		<>
			<div className={styles.form_content}>
				<div className={styles.header}>
					<div className={styles.description}>
						<div style={{ fontSize: '14px', color: '#4F4F4F', fontWeight: '500' }}>
							Please select all the services you would want to invoice to this
							invoicing party.
						</div>

						<div style={{ fontSize: '12px', color: '#828282', fontWeight: '400' }}>
							If you want to add other services to this invoicing party please
							uncheck from the invoicing party that it has been invoiced to.
						</div>
					</div>

					<div className={styles.currency_select}>
						<Select
							className="primary sm"
							placeholder=""
							value={invoiceCurrency}
							onChange={onChangeInvoicingPartyCurrency}
							options={CURRENCY_OPTIONS}
							disabled={loading}
						/>
					</div>
				</div>

				<div className={styles.services_invoice_to}>
					{savedServicesInvoiceTo.map((option) => {
						const { label, service_id } = option;

						const isChecked = services.some((service) => service.service_id === service_id);

						return (
							<div className={styles.service_invoice_to_option_label}>
								<Checkbox
									checked={isChecked}
									onChange={() => onChangeService(service_id)}
									disabled={loading || invoicingParties.length <= 1}
								/>
								<div
									className={`${styles.service_invoice_to_optionLabel} 
								    ${invoicingParties.length <= 1 ? 'disabled' : ''}`}
									role="presentation"
									onClick={() => {
										if (loading || invoicingParties.length <= 1) {
											return null;
										}
										return onChangeService(service_id);
									}}
								>
									{label}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<PaymentModes
				paymentModes={paymentModes}
				setPaymentModes={setPaymentModes}
				invoicingParty={invoicingParty}
				detail={detail}
				invoice={invoice}
			/>

			<div className={styles.button_container}>
				<Button
					className="secondary"
					onClick={onClickCancelButton}
					disabled={loading}
					size="md"
					ghost
				>
					Cancel
				</Button>

				<Button
					className="primary"
					onClick={saveInvoicingParty}
					disabled={loading || services.length === 0}
					size="md"
				>
					{loading ? 'Submitting' : 'Submit'}
				</Button>
			</div>
		</>
	);
}

export default SelectServicesInvoiceToAndCurrencyForm;
